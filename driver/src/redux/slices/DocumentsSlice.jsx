import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    DL: false,
    RC: false,
    insurance: false,
    others: false
}

const docSlice = createSlice({
    name: "vehicleInformations",
    initialState,
    reducers:{
        setDL: (state) => {
            state.DL = true;
        },
        setRC: (state) => {
            state.RC = true;
        },
        setInsurance: (state) => {
            state.insurance = true;
        },
        setOther: (state) => {
            state.others = true;
        },
    }
})

export const { setDL, setRC, setInsurance, setOther } = docSlice.actions;
export default docSlice.reducer;
