import { createRoot } from 'react-dom/client'
import './index.css'
//ReactRouterDom nem mais evoluído
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './content/pages/index'
createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path='/' element={<Index />} />
    </Routes>
  </Router>
)
