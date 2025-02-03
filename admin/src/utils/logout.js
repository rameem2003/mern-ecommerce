import { useDispatch } from "react-redux";
import {
  adminLoginReducer,
  adminLogoutReducer,
} from "../redux/features/AdminSlice";

const logout = () => {
  const dispatch = useDispatch();
  dispatch(adminLogoutReducer());
};

export { logout };
