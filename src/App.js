import './photo.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import PhotoGallery from './component/photo_gallery'

function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
          <Route path="/" element={<PhotoGallery />} exact />
           {/* <Route path="/" element={<Home />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />*/}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
  export default App;