uniform float normScale;
uniform float timeFactor;

void main() {
    float pulsation = cos(timeFactor);
    float radius = normScale;

    vec4 mvPosition = modelViewMatrix * vec4(position * pulsation * radius, 1.0);

    // Set the gl_Position
    gl_Position = projectionMatrix * mvPosition;
}