import gql from 'graphql-tag';

export const VIDEO_FRAGMENT = gql`
      fragment videopack on  Video{
        itemId
        itemLink
        itemImage
        itemDuration
        itemTitle
        category
        subCategory
        genre
        trailerUrl
        productionCompany
        productionYear
        description
        timeLeft
        source{
          src
          type
        }
        season
        episode
        episodeTitle
      }
  `;

  export const TRANSACTION_FRAGMENT = gql`
      fragment transpack on  Transaction{
        id
        viewerId
        status
        amount
        quantity
        recurring
        subscriptionId
        subscriptionPlan
        subscriberFirstName
        subscriberLastName
        subscriberEmail
        planId
        gateway
        startDate
        dueDate
        createdAt
      }
  `;

  export const COMMENT_FRAGMENT = gql`
      fragment comment on  Comments{
        id
        createdAt
        comment
        likes
        user{
          viewerId
          imageUrl
          firstName
          lastName
        }
      }
  `;

export const LOGIN_USER = gql`
 mutation LoginUser($email:String!,$passPhrase:String!){
  loginUser(input:{email:$email,passPhrase:$passPhrase}){
    token
    user{
      id
      userId
      email
      isEmailConfirmed
      status
      userType
      viewer{
        firstName
        lastName
        phone
        imageUrl
        country
        gender
      }
      billing{
        id
        billingId
        subscriptionId
        status
      }
    }
    transaction{
      ...transpack
    }
    history{
      ...videopack
    }
    queue{
      ...videopack
    }
    liked{
      ...videopack
    }
  
    }
}
${VIDEO_FRAGMENT}
${TRANSACTION_FRAGMENT}
`;

export const SIGNUP_USER = gql`
mutation AddUser($email:String!,$passPhrase:String!,$gender:Gender!,$firstName:String!,$lastName:String!,$phone:String,$country:String!,$touchPoint:String){
    addUser(input:{email:$email,passPhrase:$passPhrase,gender:$gender,firstName:$firstName,lastName:$lastName,phone:$phone,country:$country,touchPoint:$touchPoint}){
      token
      user{
      id
      userId
      email
      isEmailConfirmed
      status
      userType
      viewer{
        firstName
        lastName
        phone
        imageUrl
        country
        gender
      }
      billing{
        id
        billingId
        subscriptionId
        status
      }
    }
    
  }
  }
`;

export const TOTAL_MOVIES = gql`
 query GetVideos($category:String){
  getVideos(input:{category:$category}){
    videos{
      ...videopack
    }
    }
}
${VIDEO_FRAGMENT}
`;

export const SEARCH_VIDEOS = gql`
mutation GetSearchVideo($param:String){
  getSearchVideo(input:{param:$param}){
    videos{
      ...videopack
    }
    }
}
${VIDEO_FRAGMENT}
`;

export const ONE_VIDEO = gql`
 mutation GetVideo($itemId:Int!){
  getVideo(input:{itemId:$itemId}){
    
    ...videopack
    
    }
}
${VIDEO_FRAGMENT}
`;

export const GET_VIEWER_CONTENT = gql`
query GetViewerContent($category:String){
  getViewerContent(input:{category:$category}){
    histories{
      ...videopack
    }    
    videos{
      ...videopack
    }
    suggestions{
      ...videopack
    }
        }
}
${VIDEO_FRAGMENT}
`;

export const ADD_QUEUE = gql`
mutation AddQueue($itemId:Int!){
  addQueue(input:{itemId:$itemId}){
    ...videopack
}
}
${VIDEO_FRAGMENT}
`;

export const ADD_LIKES = gql`
mutation AddLikes($itemId:Int!,$viewerId:Int){
  addLikes(input:{itemId:$itemId,viewerId:$viewerId}){
    status
    video{
    ...videopack
    }
}
}
${VIDEO_FRAGMENT}
`;

export const ADD_HISTORY = gql`
mutation AddHistory($itemId:Int!,$timeLeft:String!){
  addHistory(input:{itemId:$itemId,timeLeft:$timeLeft}){
    createdAt
    video{
    ...videopack
    }
}
}
${VIDEO_FRAGMENT}
`;

export const ADD_COMMENT_LIKES = gql`
mutation AddCommentLikes($itemId:Int!,$authorId:Int!,$commentId:Int!,$viewerId:Int){
  addCommentLikes(input:{itemId:$itemId,authorId:$authorId,commentId:$commentId,viewerId:$viewerId}){
    success
}
}`;

export const UPDATE_USER_DETAILS = gql`
mutation UpdateViewer($phone:String,$firstName:String,$lastName:String,$dateOfBirth:String){
  updateViewer(input:{phone:$phone,firstName:$firstName,lastName:$lastName,dateOfBirth:$dateOfBirth}){
    firstName
    lastName
    phone
    dateofBirth
}
}`;

export const CANCEL_SUBSCRIPTION = gql`
mutation CancelSubscription($subscriptionId:String!){
  cancelSubscription(input:{subscriptionId:$subscriptionId}){
    transaction{
      ...transpack   
    }
  }
}
${TRANSACTION_FRAGMENT}
`;

export const CREATE_PAYPAL_TRANSACTION = gql`
mutation CreateTransaction($userId:Int!,$status:String!,$amount:String!,$quantity:Int,$recurring:String,$subscriptionId:String,$subscriptionPlan:String,$subscriberFirstName:String,$subscriberLastName:String,$subscriberEmail:String,$planId:String,$gateway:String,$startDate:String,$dueDate:String,$createdAt:String){
  createTransaction(input:{userId:$userId,status:$status,amount:$amount,quantity:$quantity,recurring:$recurring,subscriptionId:$subscriptionId,subscriptionPlan:$subscriptionPlan,subscriberFirstName:$subscriberFirstName,subscriberLastName:$subscriberLastName,subscriberEmail:$subscriberEmail,planId:$planId,gateway:$gateway,startDate:$startDate,dueDate:$dueDate,createdAt:$createdAt}){
    id
    transaction{
      ...transpack 
    }
    billing{
      id
      billingId
      status
      subscriptionId
    }
}
}
${TRANSACTION_FRAGMENT}
`;

export const UPDATE_PASSWORD = gql`
mutation UpdatePassword($password:String!$newpassword:String!){
  updatePassword(input:{password:$password,newpassword:$newpassword}){
    success
}
}`;

export const ADD_COMMENT = gql`
mutation AddComment($itemId:Int!,$viewerId:Int,$comment:String!){
  addComment(input:{itemId:$itemId,viewerId:$viewerId,comment:$comment}){
    ...comment
}
}
${COMMENT_FRAGMENT}
`;

export const GET_PRIOR_VIDEOS = gql`
mutation GetPriorVideo($itemId:Int!){
  getPriorVideo(input:{itemId:$itemId}){
    likes
    video{
      ...videopack
    }
    queue{
      ...videopack
    }
    supporting{
      ...videopack
    }
    episodes{
      ...videopack
    }
    comments{
      ...comment 
    }
    
  }   
  
}
${VIDEO_FRAGMENT}
${COMMENT_FRAGMENT}
`;

export const GET_EPISODES = gql`
mutation GetEpisodes($title:String!,$season:String!){
  getEpisodes(input:{title:$title, season: $season}){
   
    ...videopack

    }
    
}
${VIDEO_FRAGMENT}
`;

export const SET_CODE = gql`
mutation SetCode($email:String!){
  setCode(input:{email:$email}){
    
    nodes{
    success
    userId
    email
    }
  
    }
}
`;

export const VERIFY_CODE = gql`
mutation VerifyCode($email:String!,$code:String!){
  verifyCode(input:{email:$email,code:$code}){
    nodes{
    success
    userId
    email
    code
    }
    }
}
`;

export const SET_PASSWORD = gql`
mutation SetPassword($userId: Int!,$code: String!, $password:String!){
  setPassword(input:{userId:$userId,code:$code,password:$password}){
    
    success
  
    }
}
`;