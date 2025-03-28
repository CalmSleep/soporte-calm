import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const middleware = () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    next(action);
};

export default middleware;