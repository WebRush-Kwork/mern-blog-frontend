import styles from './AddComment.module.scss'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'

export const Index = () => {
	const isAuth = useSelector(selectIsAuth)
	const userData = useSelector(state => state.auth.data)

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={isAuth ? userData.avatarUrl : ''}
				/>
				<div className={styles.form}>
					<TextField
						label='Написать комментарий'
						variant='outlined'
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button variant='contained'>Отправить</Button>
				</div>
			</div>
		</>
	)
}
