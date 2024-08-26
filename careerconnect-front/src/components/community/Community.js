import React, { useState } from 'react';
import { FiBriefcase, FiTrendingUp, FiUsers, FiMap, FiBook } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import './Community.css';

const jobData = {
    developer: {
        title: "개발자",
        jobPostings: [
            "프론트엔드 개발자 - 테크 기업 A",
            "백엔드 개발자 - 스타트업 B",
            "데이터 사이언티스트 - 대기업 C"
        ],
        skillTrends: [
            { name: 'React', count: 100 },
            { name: 'Node.js', count: 80 },
            { name: 'Python', count: 70 },
            { name: 'Java', count: 60 },
            { name: 'Docker', count: 50 },
        ],
        careerRoadmap: ["주니어 개발자", "시니어 개발자", "테크 리드", "CTO"],
        onlineCourses: [
            "React 마스터 클래스",
            "파이썬 기초부터 심화까지",
            "클라우드 컴퓨팅 입문"
        ]
    },
    designer: {
        title: "디자이너",
        jobPostings: [
            "UI/UX 디자이너 - 테크 기업 X",
            "그래픽 디자이너 - 광고 에이전시 Y",
            "제품 디자이너 - 스타트업 Z"
        ],
        skillTrends: [
            { name: 'Figma', count: 90 },
            { name: 'Adobe XD', count: 75 },
            { name: 'Sketch', count: 60 },
            { name: 'Photoshop', count: 85 },
            { name: 'Illustrator', count: 70 },
        ],
        careerRoadmap: ["주니어 디자이너", "시니어 디자이너", "아트 디렉터", "크리에이티브 디렉터"],
        onlineCourses: [
            "UI/UX 디자인 기초",
            "디지털 일러스트레이션 마스터 클래스",
            "브랜드 아이덴티티 디자인"
        ]
    },
    marketer: {
        title: "마케터",
        jobPostings: [
            "디지털 마케터 - 이커머스 기업 P",
            "콘텐츠 마케터 - 미디어 회사 Q",
            "그로스 마케터 - 스타트업 R"
        ],
        skillTrends: [
            { name: 'SEO', count: 85 },
            { name: 'Google Analytics', count: 80 },
            { name: 'Social Media', count: 95 },
            { name: 'Content Marketing', count: 75 },
            { name: 'Email Marketing', count: 70 },
        ],
        careerRoadmap: ["주니어 마케터", "시니어 마케터", "마케팅 매니저", "CMO"],
        onlineCourses: [
            "디지털 마케팅 전략",
            "소셜 미디어 마케팅 마스터하기",
            "데이터 기반 마케팅"
        ]
    },
    planner: {
        title: "기획자",
        jobPostings: [
            "서비스 기획자 - IT 기업 L",
            "전략 기획자 - 컨설팅 회사 M",
            "프로덕트 매니저 - 스타트업 N"
        ],
        skillTrends: [
            { name: 'Product Management', count: 90 },
            { name: 'Business Analysis', count: 85 },
            { name: 'Agile', count: 75 },
            { name: 'User Research', count: 80 },
            { name: 'Data Analysis', count: 70 },
        ],
        careerRoadmap: ["주니어 기획자", "시니어 기획자", "프로덕트 오너", "CPO"],
        onlineCourses: [
            "프로덕트 매니지먼트 기초",
            "비즈니스 모델 혁신",
            "사용자 중심 서비스 기획"
        ]
    },
    dataAnalyst: {
        title: "데이터 분석가",
        jobPostings: [
            "데이터 분석가 - 금융 기업 D",
            "데이터 엔지니어 - 테크 기업 E",
            "비즈니스 애널리스트 - 스타트업 F"
        ],
        skillTrends: [
            { name: 'Python', count: 120 },
            { name: 'SQL', count: 110 },
            { name: 'R', count: 90 },
            { name: 'Tableau', count: 85 },
            { name: 'Power BI', count: 80 },
        ],
        careerRoadmap: ["주니어 데이터 분석가", "시니어 데이터 분석가", "데이터 사이언티스트", "데이터 리드"],
        onlineCourses: [
            "데이터 분석 기초",
            "SQL 마스터 클래스",
            "머신 러닝 개론"
        ]
    },
    itManager: {
        title: "IT 관리자",
        jobPostings: [
            "IT 매니저 - 제조업체 G",
            "네트워크 관리자 - 금융 회사 H",
            "시스템 관리자 - 스타트업 I"
        ],
        skillTrends: [
            { name: 'Network Security', count: 100 },
            { name: 'Linux', count: 95 },
            { name: 'Cloud Computing', count: 90 },
            { name: 'Virtualization', count: 85 },
            { name: 'ITIL', count: 80 },
        ],
        careerRoadmap: ["IT 지원", "IT 관리", "IT 부서장", "CIO"],
        onlineCourses: [
            "IT 관리 입문",
            "네트워크 보안 마스터 클래스",
            "클라우드 관리 기초"
        ]
    },
    contentWriter: {
        title: "콘텐츠 작가",
        jobPostings: [
            "블로그 작가 - 미디어 기업 J",
            "카피라이터 - 광고 에이전시 K",
            "콘텐츠 에디터 - 출판사 L"
        ],
        skillTrends: [
            { name: 'SEO Writing', count: 100 },
            { name: 'Content Strategy', count: 95 },
            { name: 'Copywriting', count: 90 },
            { name: 'Editing', count: 85 },
            { name: 'Creative Writing', count: 80 },
        ],
        careerRoadmap: ["주니어 작가", "시니어 작가", "콘텐츠 매니저", "콘텐츠 디렉터"],
        onlineCourses: [
            "카피라이팅 기초",
            "콘텐츠 마케팅 전략",
            "크리에이티브 라이팅 마스터 클래스"
        ]
    },
    hrManager: {
        title: "HR 관리자",
        jobPostings: [
            "HR 매니저 - 대기업 M",
            "인재 개발 전문가 - IT 기업 N",
            "채용 담당자 - 스타트업 O"
        ],
        skillTrends: [
            { name: 'Talent Management', count: 90 },
            { name: 'Recruitment', count: 85 },
            { name: 'Employee Relations', count: 80 },
            { name: 'HR Analytics', count: 75 },
            { name: 'Organizational Development', count: 70 },
        ],
        careerRoadmap: ["HR 코디네이터", "HR 관리자", "HR 디렉터", "CHRO"],
        onlineCourses: [
            "인적 자원 관리 기초",
            "채용 및 인재 확보 전략",
            "HR 분석 기초"
        ]
    }


};

const JobPostings = ({ data }) => (
    <div className="section job-postings">
        <h2><FiBriefcase /> 최신 채용 정보 - {data.title}</h2>
        <ul>
            {data.jobPostings.map((job, index) => (
                <li key={index}>{job}</li>
            ))}
        </ul>
    </div>
);

const SkillTrends = ({ data }) => (
    <div className="section skill-trends">
        <h2><FiTrendingUp /> 기술 트렌드 분석</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.skillTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const Mentoring = ({ title }) => (
    <div className="section mentoring">
        <h2><FiUsers /> 멘토링 프로그램</h2>
        <p>{title} 경력자와 연결하여 조언을 받아보세요.</p>
        <button>멘토 찾기</button>
    </div>
);

const CareerRoadmap = ({ data }) => (
    <div className="section career-roadmap">
        <h2><FiMap /> 커리어 로드맵</h2>
        <ul>
            {data.careerRoadmap.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ul>
    </div>
);

const OnlineCourses = ({ data }) => (
    <div className="section online-courses">
        <h2><FiBook /> 온라인 교육 과정</h2>
        <ul>
            {data.onlineCourses.map((course, index) => (
                <li key={index}>{course}</li>
            ))}
        </ul>
    </div>
);

const Community = () => {
    const { jobCategory } = useParams(); // Extract jobCategory from URL params
    const [activeTab, setActiveTab] = useState('jobs');
    const data = jobData[jobCategory] || jobData.developer; // Fallback to developer if jobCategory is invalid

    return (
        <div className="community-container">
            <h1>{data.title} Hub</h1>
            <nav className="community-nav">
                <button onClick={() => setActiveTab('jobs')} className={activeTab === 'jobs' ? 'active' : ''}>
                    <FiBriefcase /> 채용 정보
                </button>
                <button onClick={() => setActiveTab('trends')} className={activeTab === 'trends' ? 'active' : ''}>
                    <FiTrendingUp /> 기술 트렌드
                </button>
                <button onClick={() => setActiveTab('mentoring')} className={activeTab === 'mentoring' ? 'active' : ''}>
                    <FiUsers /> 멘토링
                </button>
                <button onClick={() => setActiveTab('roadmap')} className={activeTab === 'roadmap' ? 'active' : ''}>
                    <FiMap /> 커리어 로드맵
                </button>
                <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'active' : ''}>
                    <FiBook /> 온라인 교육
                </button>
            </nav>
            <div className="community-content">
                {activeTab === 'jobs' && <JobPostings data={data} />}
                {activeTab === 'trends' && <SkillTrends data={data} />}
                {activeTab === 'mentoring' && <Mentoring title={data.title} />}
                {activeTab === 'roadmap' && <CareerRoadmap data={data} />}
                {activeTab === 'courses' && <OnlineCourses data={data} />}
            </div>
        </div>
    );
};

export default Community;