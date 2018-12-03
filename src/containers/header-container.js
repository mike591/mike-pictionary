import { connect } from 'react-redux';
import { Header } from 'components';

const mapStateToProps = (state) => ({
    roomName: state.settings.roomName,
    userName: state.settings.userName,
    isDrawing: state.settings.isDrawing,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
