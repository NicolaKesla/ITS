// Required packages
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create express app
const app = express();
const PORT = 3001; 

// Middleware
app.use(cors()); 
app.use(express.json());

// API Endpoints

// Ana Sayfa
app.get('/', (req, res) => {
    res.send('Staj Takip Sistemi Back-end i (PostgreSQL + Prisma) Çalışıyor! 🚀');
});

// Yeni kullanici
app.post('/api/kullanici', async (req, res) => {
    // req.body -> React'ten bize gönderilen JSON verisi    
    const { email, username, password, roleId } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
        return res.status(400).json({ error: 'Email, username ve password zorunludur.' });
    }

    // 10 is the general safety standart
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // If roleId is not provided, find the "General Admin" role
        let finalRoleId = roleId;
        if (!finalRoleId) {
            const defaultRole = await prisma.role.findUnique({
                where: { name: 'General Admin' }
            });
            finalRoleId = defaultRole?.id;
        }

        if (!finalRoleId) {
            return res.status(400).json({ error: 'Geçerli bir rol bulunamadı.' });
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                roleId: finalRoleId,
            },
            include: {
                role: true,
                department: true
            }
        });
        
        // React'e oluşturulan yeni kullanıcıyı JSON olarak gönder
        res.json(newUser);

    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') { 
            return res.status(400).json({ error: 'Bu e-posta adresi veya kullanıcı adı zaten kullanılıyor.' });
        }
        res.status(500).json({ error: 'Kullanıcı oluşturulurken bir hata oluştu.' });
    }
});

// Tüm kullanıcıları getirme
app.get('/api/kullanicilar', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: {
                    select: {
                        name: true
                    }
                },
                department: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kullanıcılar getirilirken bir hata oluştu.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with role and department
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                role: true,
                department: true
            }
        });

        // Error if user is not found
        if (!user) {
            // General error message for security reasons
            return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Error if password is wrong
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email },  // Payload
            process.env.JWT_SECRET,                  // Secret
            { expiresIn: '1h' }                      // Expires in 1 hour
        );

        // Send token back to user
        res.json({
            message: 'Giriş başarılı!',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                department: user.department,
                requiresPasswordChange: user.requiresPasswordChange
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Giriş yapılırken bir sunucu hatası oluştu.' });
    }
});

// Reset Password
app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        // Error if user is not found
        if (!user) {
            return res.status(404).json({ error: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await prisma.user.update({
            where: { email: email },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Şifreniz başarıyla güncellendi.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Şifre güncellenirken bir hata oluştu.' });
    }
});

// Get all departments
app.get('/api/departments', async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            select: {
                id: true,
                name: true
            }
        });
        res.json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Bölümler getirilirken bir hata oluştu.' });
    }
});

// Get current chair of a specific department
app.get('/api/department-chair/:departmentId', async (req, res) => {
    try {
        const departmentId = parseInt(req.params.departmentId);

        // Find Commission Chair role
        const chairRole = await prisma.role.findUnique({
            where: { name: 'Commission Chair' }
        });

        if (!chairRole) {
            return res.json(null);
        }

        // Find chair for this department
        const chair = await prisma.user.findFirst({
            where: {
                departmentId: departmentId,
                roleId: chairRole.id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        res.json(chair);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Başkan getirilirken bir hata oluştu.' });
    }
});

// Create new commission chair (creates user with Commission Chair role)
app.post('/api/create-commission-chair', async (req, res) => {
    try {
        const { departmentId, firstName, lastName, email, temporaryPassword } = req.body;

        if (!departmentId || !firstName || !lastName || !email || !temporaryPassword) {
            return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
        }

        // Find Commission Chair role
        const chairRole = await prisma.role.findUnique({
            where: { name: 'Commission Chair' }
        });

        if (!chairRole) {
            return res.status(404).json({ error: 'Commission Chair rolü bulunamadı.' });
        }

        // Check if there's already a chair in this department
        const existingChair = await prisma.user.findFirst({
            where: {
                departmentId: departmentId,
                roleId: chairRole.id
            }
        });

        // If exists, remove them first
        if (existingChair) {
            await prisma.user.delete({
                where: { id: existingChair.id }
            });
        }

        // Create username from first and last name
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
        const fullName = `${firstName} ${lastName}`;
        
        // Hash temporary password
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

        // Create new chair with requiresPasswordChange flag set to true
        const newChair = await prisma.user.create({
            data: {
                name: fullName,
                username: username,
                email: email,
                password: hashedPassword,
                roleId: chairRole.id,
                departmentId: departmentId,
                requiresPasswordChange: true
            },
            include: {
                role: true,
                department: true
            }
        });

        res.json({
            message: 'Komisyon başkanı başarıyla oluşturuldu.',
            user: newChair
        });

    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Bu e-posta veya kullanıcı adı zaten kullanılıyor.' });
        }
        res.status(500).json({ error: 'Komisyon başkanı oluşturulurken bir hata oluştu.' });
    }
});

// Remove commission chair
app.delete('/api/remove-commission-chair/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        await prisma.user.delete({
            where: { id: userId }
        });

        res.json({ message: 'Komisyon başkanı başarıyla kaldırıldı.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Komisyon başkanı kaldırılırken bir hata oluştu.' });
    }
});

// Change password endpoint
app.post('/api/change-password', async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mevcut şifre yanlış.' });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password and set requiresPasswordChange to false
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedNewPassword,
                requiresPasswordChange: false
            }
        });

        res.json({ message: 'Şifre başarıyla değiştirildi.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Şifre değiştirilirken bir hata oluştu.' });
    }
});

// Get users with Commission Chair role
app.get('/api/commission-chairs', async (req, res) => {
    try {
        // Find the Commission Chair role
        const chairRole = await prisma.role.findUnique({
            where: { name: 'Commission Chair' }
        });

        if (!chairRole) {
            return res.status(404).json({ error: 'Commission Chair rolü bulunamadı.' });
        }

        // Get all users with Commission Chair role
        const chairs = await prisma.user.findMany({
            where: {
                roleId: chairRole.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                department: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        res.json(chairs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Komisyon başkanları getirilirken bir hata oluştu.' });
    }
});

// Assign commission chair to department
app.post('/api/assign-commission-chair', async (req, res) => {
    try {
        const { userId, departmentId } = req.body;

        if (!userId || !departmentId) {
            return res.status(400).json({ error: 'Kullanıcı ID ve Bölüm ID gereklidir.' });
        }

        // Update user's department
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                departmentId: departmentId
            },
            include: {
                role: true,
                department: true
            }
        });

        res.json({
            message: 'Komisyon başkanı başarıyla atandı.',
            user: updatedUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Komisyon başkanı atanırken bir hata oluştu.' });
    }
});

// Get commission status (all chairs by department)
app.get('/api/commission-status', async (req, res) => {
    try {
        // Find the Commission Chair and Commission Member roles
        const chairRole = await prisma.role.findUnique({
            where: { name: 'Commission Chair' }
        });

        const memberRole = await prisma.role.findUnique({
            where: { name: 'Commission Member' }
        });

        if (!chairRole && !memberRole) {
            return res.json([]);
        }

        // Get all departments with their commission chairs and members
        const departments = await prisma.department.findMany({
            include: {
                users: {
                    where: {
                        OR: [
                            { roleId: chairRole?.id },
                            { roleId: memberRole?.id }
                        ]
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        roleId: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        // Format the response
        const commissionStatus = departments.map(dept => {
            const chair = dept.users.find(u => u.roleId === chairRole?.id);
            const members = dept.users.filter(u => u.roleId === memberRole?.id);
            
            return {
                departmentName: dept.name,
                chairName: chair ? chair.name : null,
                member1: members[0] ? members[0].name : null,
                member2: members[1] ? members[1].name : null
            };
        }).filter(item => item.chairName || item.member1 || item.member2); // Include departments with any commission member

        res.json(commissionStatus);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Komisyon durumu getirilirken bir hata oluştu.' });
    }
});

// Listen the port
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});