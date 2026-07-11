import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './page/header/header.jsx'
import Cours from './page/cours/cours.jsx'
import DetailCours from './page/DetailCours/DetailCours.jsx'
import ModifyCours from './page/modifyCours/ModifyCours.jsx'
import Info from './page/info/info.jsx'
import EmptyCours from './page/CreateEmptyCours/EmptyCours.jsx'
import CreateAccount from './page/CreateAccount/CreateAccount.jsx'
import Connection from './page/Connection/Connection.jsx'
import HomeConnect from './page/HomeConnect/HomeConnect.jsx'
import Question from './page/Question/Question.jsx'
import DetailsNote from './page/DetailsNote/DetailsNote.jsx'
import FileUploader from './page/FileUploader/FileUploader.jsx'
import ModFile from './page/ModFile/ModFile.jsx'
import Redimension from './page/RedimensionerPage/Redimension.jsx'
import Footer from './page/footer/footer.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cours />} />
        <Route path="/cours/:name" element={<DetailCours />} />
        <Route path="/cours/question/:name" element={<Question />} />
        <Route path="/info/" element={<Info />} />
        <Route path="/info/*" element={<Info />} />
        <Route path="/cours/modifyCours/:name" element={<ModifyCours />} />
        <Route path="/cours/modifyCours/*" element={<Cours />} />
        <Route path="/emptyCours" element={<EmptyCours />} />
        <Route path="/emptyCours/*" element={<EmptyCours />} />
        <Route path='/createAccount/' element={<CreateAccount />} />
        <Route path='/createAccount/*' element={<CreateAccount />} />
        <Route path='/connection/' element={<Connection />} />
        <Route path='/connection/*' element={<Connection />} />
        <Route path='/start/' element={<HomeConnect />} />
        <Route path='/start/*' element={<HomeConnect />} />
        <Route path='/cours/Notes/:name' element={<DetailsNote />} />
        <Route path='/cours/FileUpload/:indexObj/:indexPara/:indexTxt/:nameObj' element={<FileUploader />} />
        <Route path='/cours/FileUploadMod/:indexObj/:indexPara/:indexTxt/:coursName/:ImgId' element={<ModFile />} />
        <Route path='/cours/Redimension/:name/:indexPage/:indexPara' element={<Redimension />} />
        <Route path="*" element={<Cours/>} />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>
)