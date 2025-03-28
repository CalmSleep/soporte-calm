
import { useEffect, useRef } from 'react';
import { Container, DivQuizz } from "./styled"
import { IProps } from "./types"
import { onGetQuizzOpenSucceeded, onGetQuizzCloseFailed } from "@/state/products/productsActions"
import { useDispatch } from 'react-redux';

const Quizz = ({quizzActive, closeHandle, quizzKey}: IProps)  => {
  const dispatch = useDispatch()

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
      const handleOutsideClick = (event: any) => {
          if (modalRef.current && modalRef.current.contains(event.target)) {
            closeHandle()
          }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, [quizzActive]);
  
  useEffect(() => {
    const form = document.getElementById('formContainer');

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (form) {
        form.scrollTop += e.deltaY;
      }
    };

    if (form) {
      form.addEventListener('wheel', handleScroll);
    }
    if (!quizzActive && form) {
      form.removeEventListener('wheel', handleScroll);
    }

    if(quizzActive) {
      dispatch(onGetQuizzOpenSucceeded())
    }
    return () => {
      dispatch(onGetQuizzCloseFailed())
  };
   
  }, [quizzActive]);

  return (
    <Container $quizzActive={quizzActive} ref={modalRef} id='formContainer'>
      <DivQuizz data-tf-widget={quizzKey} data-tf-opacity="100" data-tf-iframe-props="title=Quiz Almohadas" data-tf-transitive-search-params data-tf-medium="snippet" style={{ width: '80%', height: '80%' }}></DivQuizz>
    </Container>
  );
};

export default Quizz;