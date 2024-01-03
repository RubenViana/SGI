uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
varying vec2 vUv;  // Declare vUv in the vertex shader
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normal;
    
    // Increase the displacement effect by adjusting the factor (0.1 in this example)
    float displacementFactor = 0.2; // Change this factor to control displacement
    
    // Extract displacement information from the second texture
    float displacement = (1.0 / texture2D(uSampler2, uv).r) * displacementFactor;

    // Apply the displacement to the position
    vec4 modelViewPosition = modelViewMatrix * vec4(position + normal * displacement, 1.0);
    
    // Calculate the final position
    gl_Position = projectionMatrix * modelViewPosition;
}
