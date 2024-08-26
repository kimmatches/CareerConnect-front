import React, { useState, useEffect } from 'react';
import { FiBriefcase } from 'react-icons/fi';
import './JobPostings.css';

const JobPostings = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobPostings();
    }, []);

    const fetchJobPostings = async () => {
        setIsLoading(true);
        try {
            // 실제 API 호출로 대체해야 합니다.
            // const response = await fetch('https://api.example.com/job-postings');
            // const data = await response.json();

            // 임시 더미 데이터
            const data = [
                { id: 1, company: "테크 기업 A", position: "프론트엔드 개발자", location: "서울", salary: "협의 후 결정" },
                { id: 2, company: "스타트업 B", position: "백엔드 개발자", location: "부산", salary: "4000-5000만원" },
                { id: 3, company: "대기업 C", position: "풀스택 개발자", location: "대전", salary: "5000-6000만원" },
                { id: 4, company: "IT 기업 D", position: "모바일 앱 개발자", location: "인천", salary: "3500-4500만원" },
                { id: 5, company: "소프트웨어 회사 E", position: "DevOps 엔지니어", location: "광주", salary: "4500-5500만원" },
            ];

            setJobPostings(data);
            setIsLoading(false);
        } catch (error) {
            setError('채용 정보를 불러오는 데 실패했습니다.');
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="job-postings">
            <h2>최신 채용 정보</h2>
            <div className="job-list">
                {jobPostings.map((job) => (
                    <div key={job.id} className="job-item">
                        <div className="job-icon"><FiBriefcase /></div>
                        <div className="job-details">
                            <h3>{job.position}</h3>
                            <p>{job.company}</p>
                            <p>{job.location} | {job.salary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobPostings;