import { Snackbar as ReactSnackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { useCallback, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

interface ShowSnackbarInterface {
    message: string | null;
    severity: AlertColor;
    timeout?: number;
}

const showSnackbarState = atom<ShowSnackbarInterface | null>({
    key: "showSnackbarState",
    default: null,
});

export function useSnackbarHook() {
    const [snackbar, setSnackbar] = useRecoilState(showSnackbarState);

    const showSnackbar = useCallback(
        (message: string, severity: AlertColor = "error", timeout = 4000) => {
            setSnackbar({
                message,
                severity,
                timeout,
            });
        },
        []
    );

    const hideSnackbar = useCallback(() => setSnackbar(null), []);

    useEffect(() => {
        if (snackbar?.message && snackbar?.timeout) {
            const timeoutId = setTimeout(() => {
                hideSnackbar();
            }, snackbar?.timeout);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [snackbar?.message, snackbar?.timeout]);

    return showSnackbar;
}

export default function Snackbar() {
    const [snackbarState, setSnackbar] = useRecoilState(showSnackbarState);
    const handleClose = () => setSnackbar(null);

    return (
        <>
            {snackbarState?.message && (
                <ReactSnackbar
                    open={!!snackbarState?.message}
                    autoHideDuration={snackbarState?.timeout}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="standard"
                        onClose={handleClose}
                        severity={snackbarState.severity}
                    >
                        {snackbarState.message}
                    </MuiAlert>
                </ReactSnackbar>
            )}
        </>
    );
}
