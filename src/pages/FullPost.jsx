import React, { useEffect, useState } from 'react'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useParams } from 'react-router-dom'
import axios from '../axios.js'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllComments, isData } from '../redux/slices/comment'

export const FullPost = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()
	const dispatch = useDispatch()
	const comments = useSelector(state => state.comments)
	const commentData = useSelector(state => state.comments.data)
	const isDataLoading = comments.status === 'loading'

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then(res => {
				setData(res.data)
				setIsLoading(false)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка')
			})
		dispatch(fetchAllComments())
	}, [])

	// useEffect(() => {
	// 	const result = commentData.map(item => ({
	// 		fullName: item.user?.fullName || 'Имя отсутствует',
	// 		text: item.text || 'Текст отсутствует',
	// 	}))

	// 	console.log(result)
	// }, [])

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		commentData.map(obj => {
	// 			console.log(obj)
	// 		})
	// 	}, 3000)
	// }, [])

	console.log(commentData)

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				user={data.user}
				imageUrl={data.imageUrl && `http://localhost:4444${data.imageUrl}`}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={3}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: 'Вася Пупкин',
							avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
						},
						text: 'Это тестовый комментарий 555555',
					},
					{
						user: {
							fullName: 'Иван Иванов',
							avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
						},
						text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</>
	)
}
