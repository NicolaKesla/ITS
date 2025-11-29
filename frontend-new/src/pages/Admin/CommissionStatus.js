import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommissionStatus.css';

const CommissionStatus = () => {
    const [commissionData, setCommissionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCommissionStatus();
    }, []);

    const fetchCommissionStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/commission-status');
            setCommissionData(response.data);
        } catch (err) {
            console.error('Error fetching commission status:', err);
            setError('Komisyon durumu yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = () => {
        window.print();
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div>
            <h2>Komisyon Durumu Görüntüle</h2>

            <div className="table-container-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3>Tüm Komisyonlar</h3>
                        <p>Her bölümdeki komisyon başkanı ve üyeleri</p>
                    </div>
                    <button className="btn-export" onClick={handleExportPDF}>
                        <i className="fa-solid fa-file-pdf"></i>
                        PDF İndir
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {commissionData.length === 0 ? (
                    <div className="info-bar">
                        <i className="fa-solid fa-circle-info"></i>
                        Henüz atanmış komisyon bulunmamaktadır.
                    </div>
                ) : (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Bölüm</th>
                                <th>Başkan</th>
                                <th>Üye 1</th>
                                <th>Üye 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commissionData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.departmentName}</td>
                                    <td>{item.chairName || '-'}</td>
                                    <td>{item.member1 || '-'}</td>
                                    <td>{item.member2 || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CommissionStatus;
