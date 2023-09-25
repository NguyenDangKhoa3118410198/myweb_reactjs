import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const auth = true
    const PrivateContainer = children

    return auth ? PrivateContainer : <Navigate to="/login" />
}

export default PrivateRoute
