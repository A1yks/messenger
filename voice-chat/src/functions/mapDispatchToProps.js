import getUserData from './getUserData';

function mapDispatchToProps(dispatch) {
    return {
        getUserData: (id) => dispatch(getUserData(id)),
    };
}

export { mapDispatchToProps };
