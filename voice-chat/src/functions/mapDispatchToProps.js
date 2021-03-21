function mapDispatchToProps(dispatch) {
    return {
        hello: (arg) => dispatch({ type: 'HELLO', arg }),
    };
}

export { mapDispatchToProps };
