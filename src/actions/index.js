import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash';


//Type 1 : Redux thunk helps in returning a function 
// export const fetchPosts =  () => {
//     return async function(dispatch, getState){
//         const response = await jsonPlaceholder.get('/posts')

//         dispatch({
//             type: "FETCH_POSTS",
//             payload: response
//         })
//     }
// } 

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'))
    // userIds.forEach(id => {
    //     dispatch(fetchUser(id))
    // })

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts')
        dispatch({
            type: "FETCH_POSTS",
            payload: response.data
        })
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/Users/${id}`)
    dispatch({
        type: "FETCH_USER",
        payload: response.data
    });
};



// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/Users/${id}`)
//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     });
// });

// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch)        
// }

