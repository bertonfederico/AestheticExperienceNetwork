function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    const ret = { 'x': centerX + (radius * Math.cos(angleInRadians)), 'y': centerY + (radius * Math.sin(angleInRadians)), 'angle': angleInDegrees};
    return ret;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees, weight) {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    const ret = { 'x': centerX + (radius * Math.cos(angleInRadians)), 'y': centerY + (radius * Math.sin(angleInRadians)), 'angle': angleInDegrees, 'weight': weight};
    return ret;
}

function cartesianToPolar(centerX, centerY, x, y) {
    const distance = Math.sqrt((centerX-x)^2 + (centerY-y)^2);
    const angle = Math.atan2(x-centerX, centerY-y);
    return { 'distance':distance, 'angle':angle };
}

function getPointsDistance(node1, node2) {
    return Math.sqrt(Math.pow(node1.x-node2.x, 2)+Math.pow(node1.y-node2.y, 2));
}