import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const InfoBox = ({ number, title, text }) => (
    <div className="info-box">
        <div className="info-number">{number}</div>
        <div className="info-content">
            <h3 className="info-title">{title}</h3>
            <p className="info-text">{text}</p>
        </div>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 로그인 버튼 클릭 시 즉시 채팅 페이지로 이동
        navigate('/chat');
    };

    return (
        <div className="home-container">
            <div className="info-section">
                <h2 className="info-main-title">취업 준비생을 위한 채팅 플랫폼</h2>
                <h4 className="info-subtitle">
                    이 사이트는 취업 준비생들을 위한 유용한 자료와 팁을 공유합니다.
                </h4>
                <div className="info-container">
                    <InfoBox
                        number="01"
                        title="자기소개서"
                        text="자기소개서 작성에 도움이 되는 팁과 예시를 공유합니다."
                    />
                    <InfoBox
                        number="02"
                        title="면접 준비"
                        text="전문가의 및 선배들의 조언과 면접 준비 전략을 공유하세요."
                    />
                    <InfoBox
                        number="03"
                        title="네트워킹"
                        text="다른 취업 준비생들과의 네트워킹 기회를 공유합니다."
                    />
                    <InfoBox
                        number="04"
                        title="취업 트렌드"
                        text="직무 분석과 최신 취업 트렌드를 파악할 수 있습니다."
                    />
                </div>
            </div>

            <div className="login-box">
                <h1 className="login-title">로그인</h1>
                <p className="welcome-text">취업 준비생 여러분을 응원합니다!</p>

                <input className="login-input" type="text" placeholder="아이디를 입력하세요" />
                <input className="login-input" type="password" placeholder="비밀번호를 입력하세요" />
                <button className="login-button" onClick={handleLogin}>로그인</button>
                <div className="login-footer">
                    <Link to="/register">회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;