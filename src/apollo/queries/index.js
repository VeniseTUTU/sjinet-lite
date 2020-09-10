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

export const GET_USER = gql`
  query GetUser{
    user @client {
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
}`;

export const GET_TRANSACTION = gql`
  query GetTransaction{
    transaction @client {
      ...transpack
    }
}
${TRANSACTION_FRAGMENT}
`;

export const GET_HISTORY = gql`
  query GetHistory{
    history @client {
      ...videopack
    }
}
${VIDEO_FRAGMENT}
`;

export const GET_QUEUE = gql`
  query GetQueue{
    queue @client{
      ...videopack
    }
}
${VIDEO_FRAGMENT}
`;

export const GET_LIKES = gql`
  query GetLikes{
    likes @client{
      ...videopack
    }
}
${VIDEO_FRAGMENT}
`;

export const GET_VIDEO_FILTER = gql`
  query GetVideoFilter{
    videoFilter @client
}`;

export const GET_PLAN = gql`
  query GetSubscriptionPlan{
    plan @client
}`;

export const GET_ROUTE = gql`
  query GetRoute{
    route @client
}`;

