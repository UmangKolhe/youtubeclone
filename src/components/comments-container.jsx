import React from 'react'

const commentsData = [
  {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[]
  },
    {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[ {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[]
  },
 {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[]
  }]
  },
    {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[]
  },
    {
    name:"Akshay Saini",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    replies:[]
  }
]

const Comments = ({data})=>{
const {name,text,replies} = data ;
return <div className='flex shadow-sm bg-gray-100 p-2 my-2 rounded-2xl'>
   <img className='w-12 h-12' alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
   <div className='px-5'>
    <p className="font-bold">{name}</p>
    <p>{text}</p>
   </div>
</div>
}

const CommentList = ({comments})=>{
  return comments.map((comment,index)=> (
    <div key={index}>
       <Comments key={index} data={comment}/>
       <div className='pl-5 border-l-black ml-5'>
         <CommentList comments={comment.replies} />
       </div>
    </div>
 
))
}

const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Comments : </h1>
     <CommentList comments={commentsData}/>
    </div>
  )
}

export default CommentsContainer