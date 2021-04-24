import { Button } from "components/controls"
import { useModal } from "providers/modal-window"
import ModalWindow from ".."
import cn from 'classnames'

import styles from './confirm-window.module.sass'


function ConfirmWindow ({title, actionTitle, onSubmit, content, children }){
	const modal = useModal()
	
	const _onSubmit = () => {
		const resp = onSubmit()
		
		if(resp && resp.then) resp.then(err => {
			if(!err) modal.close()
		})

		if(!resp)
			modal.close()
	}

	return (
		<ModalWindow title={title} style={{width: '450px'}}>
			{content && ( <div className={styles.content}>{content}</div> )}
			{children}
			<div className={cn(styles.buttons)}>
				<Button  onClick={_onSubmit}>{actionTitle}</Button>
				<button className="btn"  onClick={() => modal.close()}>Отмена</button>
			</div>
		</ModalWindow>
	)
}

ConfirmWindow.defaultProps = {
	title: "Удалить элемент?",
	actionTitle: "Удалить"
}

export default ConfirmWindow