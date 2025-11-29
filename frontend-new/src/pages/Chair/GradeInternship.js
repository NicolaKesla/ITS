import React, { useState } from 'react';
import './GradeInternship.css';

const GradeInternship = () => {
    const [selectedTerm, setSelectedTerm] = useState('2025-2026 Güz');
    const [gradeFilter, setGradeFilter] = useState('ungraded'); // Default: Puanlanmamış
    const [studentTypeFilter, setStudentTypeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [studentGrades, setStudentGrades] = useState({});
    const [studentNotes, setStudentNotes] = useState({});

    // Örnek veri - Backend'den gelecek
    const exampleStudents = [
        {
            id: 1,
            studentNumber: '190101001',
            name: 'Ali Veli',
            currentInternship: {
                company: 'Google Türkiye',
                startDate: '2025-06-15',
                endDate: '2025-07-15',
                grade: 'S'
            },
            previousInternship: null
        },
        {
            id: 2,
            studentNumber: '190101002',
            name: 'Ayşe Yılmaz',
            currentInternship: {
                company: 'Microsoft',
                startDate: '2025-06-20',
                endDate: '2025-07-20',
                grade: 'S'
            },
            previousInternship: {
                company: 'TÜBİTAK BİLGEM',
                grade: 'S'
            }
        },
        {
            id: 3,
            studentNumber: '190101003',
            name: 'Mehmet Kaya',
            currentInternship: {
                company: 'Aselsan A.Ş.',
                startDate: '2025-07-01',
                endDate: '2025-07-30',
                grade: 'U'
            },
            previousInternship: {
                company: 'Havelsan',
                grade: 'S'
            }
        },
        {
            id: 4,
            studentNumber: '190101004',
            name: 'Fatma Demir',
            currentInternship: {
                company: 'Turkcell',
                startDate: '2025-07-15',
                endDate: '2025-08-15',
                grade: null
            },
            previousInternship: null
        },
        {
            id: 5,
            studentNumber: '190101005',
            name: 'Can Öztürk',
            currentInternship: {
                company: 'Arçelik',
                startDate: '2025-05-01',
                endDate: '2025-06-05',
                grade: null
            },
            previousInternship: {
                company: 'Vestel',
                grade: 'U'
            }
        },
        {
            id: 6,
            studentNumber: '190101006',
            name: 'Zeynep Aydın',
            currentInternship: {
                company: 'STM',
                startDate: '2025-06-25',
                endDate: '2025-08-25',
                grade: null
            },
            previousInternship: null
        }
    ];

    // Dönem tarihleri (backend'den gelecek)
    const termDates = {
        start: '2025-06-01',
        end: '2025-08-31'
    };

    // Tarihin dönem dışında olup olmadığını kontrol et
    const isOutOfTermRange = (startDate, endDate) => {
        return startDate < termDates.start || endDate > termDates.end;
    };

    // Filtreleme
    const filteredStudents = exampleStudents.filter(student => {
        // Puan filtrelemesi
        if (gradeFilter !== 'all') {
            if (gradeFilter === 'ungraded' && student.currentInternship.grade !== null) return false;
            if (gradeFilter === 'S' && student.currentInternship.grade !== 'S') return false;
            if (gradeFilter === 'U' && student.currentInternship.grade !== 'U') return false;
        }

        // Öğrenci tipi filtrelemesi
        if (studentTypeFilter !== 'all') {
            if (studentTypeFilter === 'first' && student.previousInternship !== null) return false;
            if (studentTypeFilter === 'second' && student.previousInternship === null) return false;
        }

        // İsim araması
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            if (!student.name.toLowerCase().includes(query) && 
                !student.studentNumber.includes(query)) {
                return false;
            }
        }

        return true;
    });

    const handleGradeChange = (studentId, grade) => {
        setStudentGrades(prev => ({
            ...prev,
            [studentId]: grade
        }));
    };

    const handleNoteChange = (studentId, note) => {
        setStudentNotes(prev => ({
            ...prev,
            [studentId]: note
        }));
    };

    const handleSaveGrades = () => {
        console.log('Kaydedilen notlar:', studentGrades);
        console.log('Kaydedilen açıklamalar:', studentNotes);
        alert('Tüm notlar başarıyla kaydedildi!');
    };

    const getGradeValue = (student) => {
        // Önce local state'e bakıyoruz, yoksa backend'den gelen değeri kullan
        if (studentGrades[student.id] !== undefined) {
            return studentGrades[student.id];
        }
        return student.currentInternship.grade || '';
    };

    return (
        <div>
            <h2>Staj Puanlandır</h2>
            <p>Öğrencilerin staj çalışmalarını değerlendirin ve notlandırın.</p>

            {/* Filtreler ve Arama */}
            <div className="filters-card">
                <div className="filter-row">
                    <div className="filter-group">
                        <label htmlFor="term-select">Dönem Seçiniz:</label>
                        <select 
                            id="term-select"
                            value={selectedTerm}
                            onChange={(e) => setSelectedTerm(e.target.value)}
                        >
                            <option>2025-2026 Güz</option>
                            <option>2025-2026 Bahar</option>
                            <option>2024-2025 Yaz</option>
                            <option>2024-2025 Güz</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="grade-filter">Puana Göre Filtrele:</label>
                        <select 
                            id="grade-filter"
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                        >
                            <option value="all">Tümü</option>
                            <option value="S">Başarılı (S)</option>
                            <option value="U">Başarısız (U)</option>
                            <option value="ungraded">Puanlanmamış</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="type-filter">Staj Tipi:</label>
                        <select 
                            id="type-filter"
                            value={studentTypeFilter}
                            onChange={(e) => setStudentTypeFilter(e.target.value)}
                        >
                            <option value="all">Tümü</option>
                            <option value="first">Zorunlu Staj 1</option>
                            <option value="second">Zorunlu Staj 2</option>
                        </select>
                    </div>
                </div>

                {/* Arama Çubuğu */}
                <div className="search-bar">
                    <i className="fa-solid fa-search"></i>
                    <input 
                        type="text"
                        placeholder="Öğrenci adı veya numarası ile ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-search" onClick={() => setSearchQuery('')}>
                            <i className="fa-solid fa-times"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Puanlama Tablosu */}
            <div className="table-container-card">
                <div className="table-header-info">
                    <h3>{selectedTerm} Dönemi Staj Puanlama</h3>
                    <span className="student-count">{filteredStudents.length} öğrenci</span>
                </div>
                
                <div className="info-legend">
                    <span className="legend-item">
                        <span className="legend-box out-of-range"></span>
                        Kırmızı çerçeve: Dönem dışı tarih
                    </span>
                </div>

                <table className="styled-table grading-table">
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>Numara</th>
                            <th style={{width: '15%'}}>Ad Soyad</th>
                            <th style={{width: '15%'}}>Staj Yeri</th>
                            <th style={{width: '10%'}}>Başlangıç</th>
                            <th style={{width: '10%'}}>Bitiş</th>
                            <th style={{width: '12%'}}>Staj Notu</th>
                            <th style={{width: '28%'}}>Açıklama (Opsiyonel)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>
                                    <i className="fa-solid fa-circle-info"></i> Seçili filtrelere uygun öğrenci bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            filteredStudents.map(student => {
                                const outOfRange = isOutOfTermRange(
                                    student.currentInternship.startDate,
                                    student.currentInternship.endDate
                                );
                                
                                return (
                                    <tr key={student.id} className={outOfRange ? 'out-of-term-range' : ''}>
                                        <td>{student.studentNumber}</td>
                                        <td>{student.name}</td>
                                        <td>{student.currentInternship.company}</td>
                                        <td>{new Date(student.currentInternship.startDate).toLocaleDateString('tr-TR')}</td>
                                        <td>{new Date(student.currentInternship.endDate).toLocaleDateString('tr-TR')}</td>
                                        <td>
                                            <select 
                                                className="grade-select"
                                                value={getGradeValue(student)}
                                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            >
                                                <option value="">Seçiniz</option>
                                                <option value="S">S (Başarılı)</option>
                                                <option value="U">U (Başarısız)</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input 
                                                type="text"
                                                className="note-input"
                                                placeholder="Açıklama ekleyin..."
                                                value={studentNotes[student.id] || ''}
                                                onChange={(e) => handleNoteChange(student.id, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                
                <div className="table-footer">
                    <button className="btn-save-grades" onClick={handleSaveGrades}>
                        <i className="fa-solid fa-save"></i> 
                        Tüm Notları Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GradeInternship;
