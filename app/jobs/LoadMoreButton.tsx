import { Button } from "antd";
import React, { useState } from "react";

const LoadMoreButton = () => {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {}, 3000);
    };

    return (
        <Button onClick={handleClick} loading={loading}>
            Load More
        </Button>
    );
};

export default LoadMoreButton;
