/**
 * Linear interpolation between two values.
 * @param {number} a - The starting value.
 * @param {number} b - The ending value.
 * @param {number} t - The amount of interpolation between the values, from 0 to 1.
 * @returns {number} The interpolated value.
 */
// 
const linearInterpolation = (startingValue, endingValue, t) => startingValue + (endingValue - startingValue) * t;


/**
 * Clamps a value between a minimum and maximum.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @param {number} value - The value to be clamped.
 * @returns {number} The clamped value.
 */
//
const clamp = (min, max, value) => Math.max(min, Math.min(max, value));