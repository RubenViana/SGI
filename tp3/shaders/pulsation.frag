precision highp float;

uniform vec3 color;

void main() {
    // Set the final color of the fragment
    gl_FragColor = vec4(color, 1.0);
}