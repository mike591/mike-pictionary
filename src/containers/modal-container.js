import { connect } from 'react-redux';
import { Modal } from 'components';

const mapStateToProps = (state) => ({
    modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
