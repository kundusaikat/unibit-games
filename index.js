const array = [1, 3, 2, 2, -4, 6, -2, 8];
const target = 4;

// Find the first combination for the target
const combinations = findCombinations(array, target);
console.log(`First Combination for ${target}:`, combinations);

// Merge and sort the combinations into a single array
const mergedSortedArray = mergeArray(combinations);
console.log("Merged Sorted Array:", mergedSortedArray);

// Find the second combination for the double of the target
const newCombination = findCombinationsDouble(array, target * 2);
console.log(`Second Combination for ${target * 2}:`, newCombination);

// Function to find combinations whose sum equals the target
function findCombinations(array, target) {
  const combinations = [];
  const complements = {};

  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const complement = target - num;

    // Check if the complement exists in the complements object
    if (complements.hasOwnProperty(complement)) {
      // Iterate over the pairs with the complement
      for (const pair of complements[complement]) {
        combinations.push([pair[0], pair[1]]);
      }
    }

    // Update the complements object with the current number and its complement
    if (complements[num]) {
      complements[num].push([num, complement]);
    } else {
      complements[num] = [[num, complement]];
    }
  }

  return combinations;
}

// Function to merge and sort the combinations into a single array
function mergeArray(array) {
  const mergedArray = array.flat().sort((a, b) => a - b);
  return mergedArray;
}

// Function to find combinations whose sum equals the double of the target
function findCombinationsDouble(array, target) {
  const combinations = [];

  // Recursive function to find unique combinations
  function unique_combination(l, sum, K, local, A) {
    // If a unique combination is found
    if (sum === K) {
      return [local.slice()];
    }

    const combinations = [];
    const visited = new Set();

    // Find combinations starting from index l
    for (let i = l; i < A.length; i++) {
      // Skip if sum exceeds the target
      if (sum + A[i] > K) {
        continue;
      }

      // Skip if the same number is repeated
      if (i > l && A[i] === A[i - 1]) {
        continue;
      }

      // Skip if the element is already visited
      if (visited.has(A[i])) {
        continue;
      }

      // Add the element to the combination and mark it as visited
      local.push(A[i]);
      visited.add(A[i]);

      // Recursively find sub-combinations
      const subCombinations = unique_combination(i + 1, sum + A[i], K, local, A);
      combinations.push(...subCombinations);

      // Remove the element from the combination
      local.pop();
    }

    return combinations;
  }

  // Find unique combinations for the double of the target
  const uniqueCombinations = unique_combination(0, 0, target, [], array);
  combinations.push(...uniqueCombinations);

  return combinations;
}
