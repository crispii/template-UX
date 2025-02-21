import time
import json
import random
from typing import List, Dict, Any

def time_consuming_process(data_size: int = 1000, complexity: int = 5, trial: int = 1, file_name: str="output") -> Dict[str, Any]:
    """
    A function that simulates a time-consuming algorithm.
    
    Args:
        data_size: Size of the data to process (impacts execution time)
        complexity: Number of nested operations (impacts execution time)
        
    Returns:
        Dictionary with results and performance metrics
    """
    print(f"Starting process with data_size={data_size}, complexity={complexity}")
    start_time = time.time()
    
    # Create sample data
    data = [random.randint(1, 1000) for _ in range(data_size)]
    
    # Simulating complex operations
    result = data.copy()
    for i in range(complexity):
        # Expensive sorting operation
        result.sort()
        
        # Expensive transformation
        result = [x * random.random() for x in result]
        
        # Simulate database or network delay
        time.sleep(0.1)
        
        # Another expensive operation (matrix-like operation)
        intermediate = []
        for j in range(min(1000, data_size)):
            sum_vals = sum(result[max(0, j-10):min(len(result), j+10)])
            intermediate.append(sum_vals / (min(len(result), j+10) - max(0, j-10)))
        
        result = intermediate
    
    elapsed_time = time.time() - start_time

    out_dict = {
                    "result_sample": result[:5],
                    "data_processed": data_size,
                    "operations_performed": complexity,
                    "execution_time_seconds": elapsed_time,
                    "status": "completed"
                }
    print(result[:5])
    with open(file_name +'_{}.json'.format(trial), "w", encoding="utf-8") as file:
        json.dump(out_dict, file, indent=4, ensure_ascii=False)
        
    return out_dict
    

if __name__ == "__main__":
    # This allows you to test the script directly if needed
    test_result = time_consuming_process(500, 2)
    print(f"Test execution complete in {test_result['execution_time_seconds']:.2f} seconds")