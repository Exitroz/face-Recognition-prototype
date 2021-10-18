import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className= 'ma4'>
			<p className = ' white f3'>
				{'This magic brain can detect faces!'}
			</p>
			<div className = 'center'>
			  <div className='form center pa2 br3 shadow-5'>
				<input type = 'text' className = 'b--light-purple br2-m w-70 center pa2 f4' 
					onChange={onInputChange}/>
				<button className= 'w-30 dib grow f5 link pv2 ph3 white bg-light-purple'
				 	onClick={onButtonSubmit}>Detect</button>
			  </div>
			</div>
		</div>
	);
}
export default ImageLinkForm;