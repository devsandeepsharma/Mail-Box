import "./loading.css";

const Loading = () => {
    return (
        <main className="skeleton-wrapper">
            <div className="skeleton-header-bar">
                <div className="skeleton-circle" />
                <div className="skeleton-line bar" />
                <div className="skeleton-circle" />
            </div>

            <div className="skeleton-page">
                {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-header">
                        <div className="skeleton-line short" />
                        <div className="skeleton-line shorter" />
                    </div>
                    <div className="skeleton-body">
                        <div className="skeleton-line medium" />
                        <div className="skeleton-line long" />
                    </div>
                </div>
                ))}
            </div>
        </main>
    );
};

export default Loading;