import React, { useState } from 'react';
import './EarlyEvaluation.css';

const EarlyEvaluation = () => {
    const [selectedTerm, setSelectedTerm] = useState('2025-2026 Güz');
    const [gradeFilter, setGradeFilter] = useState('ungraded'); // Default: Puanlanmamış
    const [studentTypeFilter, setStudentTypeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showEvaluationModal, setShowEvaluationModal] = useState(false);
    const [evaluationData, setEvaluationData] = useState({});
    const [evaluatedStudents, setEvaluatedStudents] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    // Filtreleme (erken değerlendirilen öğrenciler hariç)
    const filteredStudents = exampleStudents.filter(student => {
        // Erken değerlendirilen öğrencileri gösterme
        if (evaluatedStudents.includes(student.id)) return false;

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

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev => {
            if (prev.includes(studentId)) {
                return prev.filter(id => id !== studentId);
            } else {
                return [...prev, studentId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedStudents.length === filteredStudents.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(filteredStudents.map(s => s.id));
        }
    };

    const handleOpenEvaluationModal = () => {
        if (selectedStudents.length === 0) {
            alert('Lütfen en az bir öğrenci seçin!');
            return;
        }
        
        // Initialize evaluation data for selected students
        const initialData = {};
        selectedStudents.forEach(id => {
            initialData[id] = {
                grade: '',
                reason: ''
            };
        });
        setEvaluationData(initialData);
        setShowEvaluationModal(true);
    };

    const handleEvaluationChange = (studentId, field, value) => {
        setEvaluationData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const handleCreateReport = () => {
        // Validate all fields are filled
        const allFilled = selectedStudents.every(id => 
            evaluationData[id]?.grade && evaluationData[id]?.reason
        );

        if (!allFilled) {
            alert('Lütfen tüm öğrenciler için not ve sebep giriniz!');
            return;
        }

        console.log('Erken değerlendirme raporu:', evaluationData);
        
        // Add evaluated students to the list
        setEvaluatedStudents(prev => [...prev, ...selectedStudents]);
        
        // Close modal and show success
        setShowEvaluationModal(false);
        setShowSuccessMessage(true);
        setSelectedStudents([]);
        setEvaluationData({});

        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    const getSelectedStudentData = () => {
        return selectedStudents.map(id => 
            exampleStudents.find(s => s.id === id)
        ).filter(s => s !== undefined);
    };

    return (
        <div>
            <h2>Erken Değerlendirme</h2>
            <p>Staj sürecini erken tamamlayan öğrencileri değerlendirin ve raporlayın.</p>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="success-banner">
                    <i className="fa-solid fa-circle-check"></i>
                    Erken değerlendirme tutanağı başarıyla oluşturuldu!
                </div>
            )}

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

            {/* Öğrenci Listesi Tablosu */}
            <div className="table-container-card">
                <div className="table-header-info">
                    <h3>{selectedTerm} Dönemi - Erken Değerlendirme</h3>
                    <span className="student-count">{filteredStudents.length} öğrenci</span>
                </div>
                
                {selectedStudents.length > 0 && (
                    <div className="selection-info">
                        <i className="fa-solid fa-check-circle"></i>
                        {selectedStudents.length} öğrenci seçildi
                    </div>
                )}

                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{width: '4%'}}>
                                <input 
                                    type="checkbox"
                                    checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th style={{width: '10%'}}>Numara</th>
                            <th style={{width: '13%'}}>Ad Soyad</th>
                            <th style={{width: '15%'}}>Önceki Staj Yeri</th>
                            <th style={{width: '15%'}}>Mevcut Staj Yeri</th>
                            <th style={{width: '12%'}}>Başlangıç</th>
                            <th style={{width: '12%'}}>Bitiş</th>
                            <th style={{width: '10%'}}>Staj Notu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
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
                                        <td>
                                            <input 
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => handleSelectStudent(student.id)}
                                            />
                                        </td>
                                        <td>{student.studentNumber}</td>
                                        <td>{student.name}</td>
                                        <td>
                                            {student.previousInternship 
                                                ? student.previousInternship.company 
                                                : <span className="no-data">-</span>
                                            }
                                        </td>
                                        <td>{student.currentInternship.company}</td>
                                        <td>{new Date(student.currentInternship.startDate).toLocaleDateString('tr-TR')}</td>
                                        <td>{new Date(student.currentInternship.endDate).toLocaleDateString('tr-TR')}</td>
                                        <td>
                                            <span className={`grade-badge ${student.currentInternship.grade ? `grade-${student.currentInternship.grade.toLowerCase()}` : 'grade-ungraded'}`}>
                                                {student.currentInternship.grade || '-'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
                
                <div className="table-footer">
                    <button 
                        className="btn-early-evaluate"
                        onClick={handleOpenEvaluationModal}
                        disabled={selectedStudents.length === 0}
                    >
                        <i className="fa-solid fa-clock-rotate-left"></i> 
                        Erken Değerlendir ({selectedStudents.length})
                    </button>
                </div>
            </div>

            {/* Evaluation Modal */}
            {showEvaluationModal && (
                <div className="modal-overlay" onClick={() => setShowEvaluationModal(false)}>
                    <div className="modal-content evaluation-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Erken Değerlendirme Formu</h3>
                            <button className="modal-close" onClick={() => setShowEvaluationModal(false)}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <p className="modal-description">
                                Seçilen öğrenciler için erken değerlendirme notlarını ve sebeplerini girin.
                            </p>

                            <div className="evaluation-list">
                                {getSelectedStudentData().map(student => (
                                    <div key={student.id} className="evaluation-item">
                                        <div className="evaluation-student-info">
                                            <strong>{student.name}</strong>
                                            <span className="student-number">({student.studentNumber})</span>
                                        </div>
                                        
                                        <div className="evaluation-inputs">
                                            <div className="eval-input-group">
                                                <label>Not:</label>
                                                <select 
                                                    value={evaluationData[student.id]?.grade || ''}
                                                    onChange={(e) => handleEvaluationChange(student.id, 'grade', e.target.value)}
                                                >
                                                    <option value="">Seçiniz</option>
                                                    <option value="S">S (Başarılı)</option>
                                                    <option value="U">U (Başarısız)</option>
                                                </select>
                                            </div>
                                            
                                            <div className="eval-input-group">
                                                <label>Sebep:</label>
                                                <input 
                                                    type="text"
                                                    placeholder="Erken değerlendirme sebebi..."
                                                    value={evaluationData[student.id]?.reason || ''}
                                                    onChange={(e) => handleEvaluationChange(student.id, 'reason', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button className="btn-modal-cancel" onClick={() => setShowEvaluationModal(false)}>
                                İptal
                            </button>
                            <button className="btn-modal-confirm" onClick={handleCreateReport}>
                                <i className="fa-solid fa-file-signature"></i> Değerlendirme Tutanağı Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EarlyEvaluation;
