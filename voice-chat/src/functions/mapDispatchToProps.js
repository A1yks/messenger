import getUserData from './getUserData';
import search from './search';

function mapDispatchToProps(dispatch) {
    return {
        getUserData: (id) => dispatch(getUserData(id)),
        searchUsers: (query) => dispatch(search(query)),
    };
}

export { mapDispatchToProps };
