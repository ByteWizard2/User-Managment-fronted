import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.types";
import { getSession, setSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_REGISTER,
  PATH_AFTER_LOGOUT,
  REGISTER_URL,
} from "../utils/globalConfig";

//We need  a reducer function for useReducer hook

const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: undefined,
    };
  }
  return state;
};

//We need an initial state for useReducer hook
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

//We create our context here and  export it
export const AuthContext = createContext<IAuthContext | null>(null);

//We need an interface for our context props
interface IProps {
  children: ReactNode;
}

//We create a component to manage all auth functionalities and export it  and use it
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  //Initial Methode
  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      if (token) {
        //valid accessToken calling by backend
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        //In response, we received jwt token and user data
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  //In Start of Application, We call initializeAuthContext to be sure about authentication status
  useEffect(() => {
    console.log("AuthContext initialization Start");
    initializeAuthContext()
      .then(() => console.log("initializeAuthContext was Succcessfull"))
      .catch((error) => console.log(error));
  }, []);

  //Register methode
  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      password: string,
      address: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        password,
        address,
      });
      console.log("Register Result:", response);
      toast.success("Register was successfull. Plese Login.");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );

  //Login methode
  const login = useCallback(async (userName: string, password: string) => {
    const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success("Login was Successfull");
    // In response, we receive JWT Token and user data
    const { newToken, userInfo } = response.data;
    setSession(newToken);
    dispatch({ type: IAuthContextActionTypes.LOGIN, payload: userInfo });
    navigate(PATH_AFTER_LOGIN);
  }, []);

  //Logout Methode
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  //We create an object for values  of context provider
  //This will keep our codes  more readable
  const valueObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valueObject}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
