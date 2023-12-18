import React from 'react'
import Navbar from '../components/navbar'

export default function FlixHive() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div>
      <navbar isScrolled={isScrolled}/>
    </div>
  )
}
