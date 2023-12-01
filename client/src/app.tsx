import daangnBusinessLogo from '/daangn-business.svg'
import figmaLogo from '/figma.svg'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://business.daangn.com" target="_blank">
          <img src={daangnBusinessLogo} className="logo" alt="daangn-business logo" />
        </a>
      </div>
      <h1>FE Winter Tech</h1>
      <h2>프론트엔드 개발자 채용 과제</h2>
      <h3>피그마를 클릭해서 확인해주세요!</h3>
      <a href="https://www.figma.com/file/ErJyPxA5IXgvt8BS8Ksbyv/%EC%9C%88%ED%84%B0%ED%85%8C%ED%81[…]%9C?type=design&node-id=0%3A1&mode=design&t=PckoXU5NsIQ3DsR3-1" target="_blank">
        <img src={figmaLogo} className="logo-figma" alt="figma logo" />
      </a>
    </>
  )
}

export default App;