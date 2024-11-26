import React, { useState } from 'react';
import '../css/legalService.css';
import calendarIcon from '../assets/calendar-icon.svg';
import callIcon from '../assets/call-icon.svg';
import goodIcon from '../assets/good-icon.svg';
import writeIcon from '../assets/write-icon.svg';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';
import profile3 from '../assets/profile3.png';
import profile4 from '../assets/profile4.png';

const LegalService = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [consultationDetails, setConsultationDetails] = useState('');

  const lawyers = [
    { name: '김아름 변호사', company: '법무법인 김앤장', profile: profile1 },
    { name: '송한주 변호사', company: '법무법인 광장', profile: profile2 },
    { name: '이권우 변호사', company: '법무법인 세종', profile: profile3 },
    { name: '김진욱 변호사', company: '법무법인 태평양', profile: profile4 },
  ];

  const contacts = [
    { name: '법률중개인 A', phone: '010-1234-5678' },
    { name: '법률중개인 B', phone: '010-9876-5432' },
    { name: '법률중개인 C', phone: '010-5555-5555' },
    { name: '법률중개인 D', phone: '010-6666-6666' },
  ];

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setStep(1); // 초기화
    setSelectedExpert(null);
    setAppointmentTime('');
    setConsultationDetails('');
  };

  const handleContactPopupClose = () => {
    setIsContactPopupOpen(false);
  };

  const handleSubmit = () => {
    console.log('예약 정보:', { appointmentTime, selectedExpert, consultationDetails });
    alert('예약이 완료되었습니다!');
    handlePopupClose();
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="legal-service-container">
      <div className="service-content">
        <div className="header-banner">
          <div className="banner-content">
            <h1>빠르고 정확한 법률 중개 서비스</h1>
            <h2>Cross Check</h2>
            <p>혹시 전세사기를 당하셨나요?<br />저희 서비스를 통해 전세사기 피해를 최소화하세요!</p>
          </div>
        </div>

        <div className="service-options">
          <div className="service-card" onClick={() => setIsPopupOpen(true)}>
            <h3>법률중개 예약</h3>
            <img src={calendarIcon} alt="Calendar" />
          </div>
          <div className="service-card">
            <h3>법률중개 기사작성</h3>
            <img src={writeIcon} alt="Write" />
          </div>
          <div className="service-card" onClick={() => setIsContactPopupOpen(true)}>
            <h3>빠른 법률중개 연락</h3>
            <img src={callIcon} alt="Call" />
          </div>
          <div className="service-card">
            <h3>리뷰 남기기</h3>
            <img src={goodIcon} alt="Review" />
          </div>
        </div>
      </div>

      <div className="lawyers-section">
        <h2>원하는 변호사에게 상담을 요청하세요!</h2>
        <div className="lawyers-slider">
          <button className="arrow-btn left">
            <img src={arrowLeft} alt="Previous" />
          </button>
          <div className="lawyers-grid">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="lawyer-card">
                <img src={lawyer.profile} alt={lawyer.name} className="lawyer-profile" />
                <div className="lawyer-info">
                  <h3>{lawyer.name}</h3>
                  <p>{lawyer.company}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow-btn right">
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handlePopupClose}>X</button>
            {step === 1 && (
              <div className="popup-step">
                <h3>캘린더에서 예약 날짜를 선택하세요</h3>
                <input
                  type="datetime-local"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
                <button onClick={handleNextStep} disabled={!appointmentTime}>다음</button>
              </div>
            )}
            {step === 2 && (
              <div className="popup-step">
                <h3>상담할 전문가를 선택하세요</h3>
                <div className="experts-grid">
                  {lawyers.map((lawyer, index) => (
                    <div
                      key={index}
                      className={`expert-card ${selectedExpert === lawyer.name ? 'selected' : ''}`}
                      onClick={() => setSelectedExpert(lawyer.name)}
                    >
                      <img src={lawyer.profile} alt={lawyer.name} />
                      <p>{lawyer.name}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handlePreviousStep}>이전</button>
                <button onClick={handleNextStep} disabled={!selectedExpert}>다음</button>
              </div>
            )}
            {step === 3 && (
              <div className="popup-step">
                <h3>상담 내용을 입력하세요</h3>
                <textarea
                  value={consultationDetails}
                  onChange={(e) => setConsultationDetails(e.target.value)}
                  placeholder="상담 내용을 입력하세요"
                ></textarea>
                <button onClick={handlePreviousStep}>이전</button>
                <button onClick={handleNextStep} disabled={!consultationDetails.trim()}>다음</button>
              </div>
            )}
            {step === 4 && (
              <div className="popup-step">
                <h3>예약 내용을 확인해주세요</h3>
                <p>날짜 및 시간: {appointmentTime}</p>
                <p>전문가: {selectedExpert}</p>
                <p>상담 내용: {consultationDetails}</p>
                <button onClick={handlePreviousStep}>이전</button>
                <button onClick={handleSubmit}>완료</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isContactPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleContactPopupClose}>X</button>
            <h3>법률중개인 연락처</h3>
            <ul className="contacts-list">
              {contacts.map((contact, index) => (
                <li key={index} className="contact-item">
                  <p>{contact.name}</p>
                  <p>{contact.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalService;
