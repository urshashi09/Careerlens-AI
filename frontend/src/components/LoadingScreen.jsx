const LoadingScreen = ({ message = "Loading", compact = false }) => {
    return (
        <div className={compact ? "loading-state compact" : "loading-state"}>
            <div className="loading-mark" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="loading-copy">
                <div className="loading-logo">Careerlens AI</div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LoadingScreen
