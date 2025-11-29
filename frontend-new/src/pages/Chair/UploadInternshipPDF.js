import React, { useState } from 'react';
import './UploadInternshipPDF.css';

const UploadInternshipPDF = () => {
    const [selectedTerm, setSelectedTerm] = useState('2025-2026 Güz');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [studentsData, setStudentsData] = useState([]);
    const [showValidation, setShowValidation] = useState(false);
    const [showAddTermModal, setShowAddTermModal] = useState(false);
    const [newTerm, setNewTerm] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    // Örnek veri - Backend'den gelecek
    const exampleStudents = [
        {
            id: 1,
            studentInfo: {
                name: 'Ahmet Yılmaz',
                studentNumber: '123456789',
                phone: '0555 123 4567',
                email: 'ahmet.yilmaz@gtu.edu.tr',
                isErasmus: false
            },
            internshipInfo: {
                type: 'Zorunlu Staj 1',
                startDate: '2025-06-15',
                endDate: '2025-07-15',
                companyName: 'Google Türkiye',
                companyPhone: '0212 123 4567',
                companyEmail: 'hr@google.com.tr'
            },
            previousInternship: null // İlk staj
        },
        {
            id: 2,
            studentInfo: {
                name: 'Ayşe Demir',
                studentNumber: '987654321',
                phone: '0532 987 6543',
                email: 'ayse.demir@gtu.edu.tr',
                isErasmus: true
            },
            internshipInfo: {
                type: 'Zorunlu Staj 2',
                startDate: '2025-07-01',
                endDate: '2025-08-30',
                companyName: 'Microsoft Türkiye',
                companyPhone: '0216 555 8888',
                companyEmail: 'info@microsoft.com.tr'
            },
            previousInternship: {
                type: 'Zorunlu Staj 1',
                startDate: '2024-06-10',
                endDate: '2024-07-20',
                companyName: 'Aselsan A.Ş.'
            }
        },
        {
            id: 3,
            studentInfo: {
                name: 'Mehmet Kaya',
                studentNumber: '555666777',
                phone: '0545 333 2222',
                email: 'mehmet.kaya@gtu.edu.tr',
                isErasmus: false
            },
            internshipInfo: {
                type: 'Zorunlu Staj 2',
                startDate: '2025-06-20',
                endDate: '2025-08-15',
                companyName: 'Turkcell İletişim Hizmetleri A.Ş.',
                companyPhone: '0850 532 0 532',
                companyEmail: 'kariyer@turkcell.com.tr'
            },
            previousInternship: {
                type: 'Zorunlu Staj 1',
                startDate: '2024-07-01',
                endDate: '2024-08-10',
                companyName: 'Vestel Elektronik'
            }
        }
    ];

    const handleFileUpload = (e, fileType) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setUploadedFiles(prev => ({
                ...prev,
                [fileType]: files.map(f => f.name)
            }));
        }
    };

    const handleProcessFiles = () => {
        // Simüle edilmiş dosya işleme
        setStudentsData(exampleStudents);
        setShowValidation(true);
        setCurrentStudentIndex(0);
    };

    const handleConfirmStudent = () => {
        console.log('Öğrenci kaydedildi:', studentsData[currentStudentIndex]);
        
        if (currentStudentIndex < studentsData.length - 1) {
            setCurrentStudentIndex(currentStudentIndex + 1);
        } else {
            alert('Tüm öğrenciler başarıyla kaydedildi!');
            // Reset
            setShowValidation(false);
            setStudentsData([]);
            setCurrentStudentIndex(0);
            setUploadedFiles([]);
        }
    };

    const handleSkipStudent = () => {
        if (currentStudentIndex < studentsData.length - 1) {
            setCurrentStudentIndex(currentStudentIndex + 1);
        } else {
            setShowValidation(false);
            setStudentsData([]);
            setCurrentStudentIndex(0);
        }
    };

    const handleAddTerm = () => {
        if (!newTerm.name || !newTerm.startDate || !newTerm.endDate) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }
        console.log('Yeni dönem eklendi:', newTerm);
        // Backend'e gönderilecek
        setShowAddTermModal(false);
        setNewTerm({ name: '', startDate: '', endDate: '' });
        alert('Dönem başarıyla eklendi!');
    };

    const currentStudent = studentsData[currentStudentIndex];

    return (
        <div>
            <h2>Staj PDF Yükleme</h2>
            <p>Yeni staj belgelerini yükleyin ve sistemin ayrıştırdığı bilgileri doğrulayın.</p>

            {/* ADIM 1: Dosya Yükleme */}
            {!showValidation && (
                <div className="form-container-card">
                    <h3>Adım 1: Staj Belgelerini Yükle</h3>
                    
                    <div className="formatted-form">
                        <div className="form-group">
                            <label htmlFor="donem">Dönem Seçimi</label>
                            <div className="input-group-with-button">
                                <select 
                                    id="donem"
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                >
                                    <option>2025-2026 Güz</option>
                                    <option>2025-2026 Bahar</option>
                                    <option>2024-2025 Yaz</option>
                                    <option>2024-2025 Güz</option>
                                </select>
                                <button className="btn-add-term" onClick={() => setShowAddTermModal(true)}>
                                    <i className="fa-solid fa-plus"></i> Dönem Ekle
                                </button>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="staj-fisi">Staj Fişleri Yükle</label>
                            <div style={{ flexBasis: '72%' }}>
                                <input 
                                    type="file" 
                                    id="staj-fisi" 
                                    className="custom-file-input"
                                    multiple
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, 'fis')}
                                />
                                {uploadedFiles.fis && uploadedFiles.fis.length > 0 && (
                                    <div className="uploaded-files-list">
                                        {uploadedFiles.fis.map((fileName, index) => (
                                            <span key={index} className="file-badge">
                                                <i className="fa-solid fa-file-pdf"></i> {fileName}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="staj-raporu">Staj Raporları Yükle</label>
                            <div style={{ flexBasis: '72%' }}>
                                <input 
                                    type="file" 
                                    id="staj-raporu" 
                                    className="custom-file-input"
                                    multiple
                                    accept=".pdf"
                                    onChange={(e) => handleFileUpload(e, 'rapor')}
                                />
                                {uploadedFiles.rapor && uploadedFiles.rapor.length > 0 && (
                                    <div className="uploaded-files-list">
                                        {uploadedFiles.rapor.map((fileName, index) => (
                                            <span key={index} className="file-badge">
                                                <i className="fa-solid fa-file-pdf"></i> {fileName}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            type="button" 
                            className="btn-submit"
                            onClick={handleProcessFiles}
                            disabled={!uploadedFiles.fis && !uploadedFiles.rapor}
                        >
                            <i className="fa-solid fa-cogs"></i> Yükle ve Bilgileri Ayrıştır
                        </button>
                    </div>
                </div>
            )}

            {/* ADIM 2: Bilgi Doğrulama */}
            {showValidation && currentStudent && (
                <div className="validation-container">
                    <div className="validation-header">
                        <h3>Adım 2: Ayrıştırılan Bilgileri Doğrula</h3>
                        <div className="student-counter">
                            Öğrenci {currentStudentIndex + 1} / {studentsData.length}
                        </div>
                    </div>
                    <p className="validation-subtitle">
                        Sistem tarafından PDF'lerden okunan bilgileri kontrol edin ve (varsa) düzenleyin.
                    </p>

                    <div className="three-column-layout">
                        {/* Öğrenci Bilgileri */}
                        <div className="info-card">
                            <h4 className="card-title">Öğrenci Bilgileri</h4>
                            <div className="compact-form-group">
                                <label>Adı Soyadı</label>
                                <input type="text" key={`name-${currentStudentIndex}`} defaultValue={currentStudent.studentInfo.name} />
                            </div>
                            <div className="compact-form-group">
                                <label>Öğrenci No</label>
                                <input type="text" key={`studentNumber-${currentStudentIndex}`} defaultValue={currentStudent.studentInfo.studentNumber} />
                            </div>
                            <div className="compact-form-group">
                                <label>Telefon</label>
                                <input type="tel" key={`phone-${currentStudentIndex}`} defaultValue={currentStudent.studentInfo.phone} />
                            </div>
                            <div className="compact-form-group">
                                <label>E-posta</label>
                                <input type="email" key={`email-${currentStudentIndex}`} defaultValue={currentStudent.studentInfo.email} />
                            </div>
                            <div className="checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id={`erasmus-${currentStudentIndex}`}
                                    key={`erasmus-${currentStudentIndex}`}
                                    defaultChecked={currentStudent.studentInfo.isErasmus}
                                />
                                <label htmlFor={`erasmus-${currentStudentIndex}`}>Erasmus Stajı</label>
                            </div>
                        </div>

                        {/* Mevcut Staj Bilgileri */}
                        <div className="info-card">
                            <h4 className="card-title">Mevcut Staj Bilgileri</h4>
                            <div className="compact-form-group">
                                <label>Staj Tipi</label>
                                <select key={`type-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.type}>
                                    <option>Zorunlu Staj 1</option>
                                    <option>Zorunlu Staj 2</option>
                                </select>
                            </div>
                            <div className="compact-form-group">
                                <label>Başlangıç</label>
                                <input type="date" key={`startDate-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.startDate} />
                            </div>
                            <div className="compact-form-group">
                                <label>Bitiş</label>
                                <input type="date" key={`endDate-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.endDate} />
                            </div>
                            <div className="compact-form-group">
                                <label>Kurum Adı</label>
                                <input type="text" key={`companyName-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.companyName} />
                            </div>
                            <div className="compact-form-group">
                                <label>Kurum Tel.</label>
                                <input type="tel" key={`companyPhone-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.companyPhone} />
                            </div>
                            <div className="compact-form-group">
                                <label>Kurum Mail</label>
                                <input type="email" key={`companyEmail-${currentStudentIndex}`} defaultValue={currentStudent.internshipInfo.companyEmail} />
                            </div>
                        </div>

                        {/* Önceki Staj Bilgileri */}
                        <div className="info-card">
                            <h4 className="card-title">Önceki Staj Bilgileri</h4>
                            {currentStudent.previousInternship ? (
                                <>
                                    <div className="compact-form-group">
                                        <label>Staj Tipi</label>
                                        <input 
                                            type="text" 
                                            key={`prevType-${currentStudentIndex}`}
                                            defaultValue={currentStudent.previousInternship.type}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>
                                    <div className="compact-form-group">
                                        <label>Başlangıç</label>
                                        <input 
                                            type="date" 
                                            key={`prevStartDate-${currentStudentIndex}`}
                                            defaultValue={currentStudent.previousInternship.startDate}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>
                                    <div className="compact-form-group">
                                        <label>Bitiş</label>
                                        <input 
                                            type="date" 
                                            key={`prevEndDate-${currentStudentIndex}`}
                                            defaultValue={currentStudent.previousInternship.endDate}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>
                                    <div className="compact-form-group">
                                        <label>Kurum Adı</label>
                                        <input 
                                            type="text" 
                                            key={`prevCompanyName-${currentStudentIndex}`}
                                            defaultValue={currentStudent.previousInternship.companyName}
                                            disabled
                                            className="disabled-input"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="no-previous-internship">
                                    <i className="fa-solid fa-circle-info"></i>
                                    <p>Bu öğrencinin ilk stajıdır.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Aksiyon Butonları */}
                    <div className="form-buttons">
                        <button className="btn-submit btn-success" onClick={handleConfirmStudent}>
                            <i className="fa-solid fa-check"></i> Bilgileri Onayla ve Kaydet
                        </button>
                        <button className="btn-submit btn-warning" onClick={handleSkipStudent}>
                            <i className="fa-solid fa-forward"></i> Atla
                        </button>
                        <button className="btn-submit btn-danger" onClick={() => {
                            setShowValidation(false);
                            setStudentsData([]);
                            setCurrentStudentIndex(0);
                        }}>
                            <i className="fa-solid fa-times"></i> İptal Et
                        </button>
                    </div>
                </div>
            )}

            {/* Dönem Ekleme Modal */}
            {showAddTermModal && (
                <div className="modal-overlay" onClick={() => setShowAddTermModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Yeni Dönem Ekle</h3>
                            <button className="modal-close" onClick={() => setShowAddTermModal(false)}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="modal-form-group">
                                <label>Dönem Adı:</label>
                                <input 
                                    type="text" 
                                    placeholder="Örn: 2025-2026 Güz"
                                    value={newTerm.name}
                                    onChange={(e) => setNewTerm({...newTerm, name: e.target.value})}
                                />
                            </div>
                            
                            <div className="modal-form-group">
                                <label>Başlangıç Tarihi:</label>
                                <input 
                                    type="date"
                                    value={newTerm.startDate}
                                    onChange={(e) => setNewTerm({...newTerm, startDate: e.target.value})}
                                />
                            </div>
                            
                            <div className="modal-form-group">
                                <label>Bitiş Tarihi:</label>
                                <input 
                                    type="date"
                                    value={newTerm.endDate}
                                    onChange={(e) => setNewTerm({...newTerm, endDate: e.target.value})}
                                />
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button className="btn-modal-cancel" onClick={() => setShowAddTermModal(false)}>
                                İptal
                            </button>
                            <button className="btn-modal-confirm" onClick={handleAddTerm}>
                                <i className="fa-solid fa-plus"></i> Dönem Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadInternshipPDF;
