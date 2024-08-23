import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        console.log('회원가입:', { username, nickname });
        alert('회원가입이 완료되었습니다!');
        navigate('/');
    };

    return (
        <div className="register-page">
            <div className="register-form-section">
                <div className="register-form-container">
                    <h1 className="register-title">취업 준비생 회원가입</h1>
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="input-group">
                            <span className="input-icon">🆔</span>
                            <input
                                type="text"
                                placeholder="아이디"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            <input
                                type="text"
                                placeholder="닉네임"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="register-button">가입하기</button>
                    </form>
                    <p className="login-link">
                        이미 계정이 있으신가요? <Link to="/">로그인</Link>
                    </p>
                </div>
            </div>
            <div className="career-info-section">
                <div className="career-info-content">
                    <h2>취업 준비 팁 💼</h2>
                    <ul>
                        <li>🖋 자기소개서는 구체적인 경험을 바탕으로 작성하세요.</li>
                        <li>🔍 관심 기업의 채용 정보를 정기적으로 확인하세요.</li>
                        <li>🗣 면접 예상 질문에 대한 답변을 미리 준비하세요.</li>
                        <li>📰 관련 업계 뉴스와 트렌드를 꾸준히 파악하세요.</li>
                        <li>🤝 네트워킹 이벤트나 채용 설명회에 참여해 정보를 얻으세요.</li>
                        <li>📚 관련 자격증 취득을 통해 전문성을 키우세요.</li>
                        <li>💻 포트폴리오를 준비하여 자신의 능력을 효과적으로 보여주세요.</li>
                        <li>🏋️ 체력 관리와 스트레스 해소를 위한 운동을 꾸준히 하세요.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Register;