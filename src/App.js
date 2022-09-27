import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { calculateTotal, getCartItems } from './store/cartSlice';

function App() {

  const dispatch = useDispatch()
  const {cartItems, isLoading} = useSelector(state => state.cart)
  const {isOpen} = useSelector(state => state.modal)

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems('random'))
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      { isOpen && <Modal/> }
      <Navbar/>
      <CartContainer/>
    </main>
  );
}
export default App;
