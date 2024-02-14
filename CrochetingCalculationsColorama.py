"""Crocheting Calculations.

Author: Jared Gonzalez
Version: 2/14/2024
"""


def grid_generator(stitches, num_rows, clusters):
    """Generates a grid representing the shifts.

    Args:
        stitches (list): The stitch pattern
        num_rows (int): How many rows do you want the pattern to run for
        clusters (int): How many stitches wide

    Returns:
        list: The grid
    """
    grid = []
    row_indicator = 1
    stitches_length = len(stitches)
    i = 0
    for num in range(num_rows):
        row = []

        while len(row) < clusters:
            row.append(stitches[i])
            i = (i + 1) % stitches_length  # Prove that

        if row_indicator % 2 != 0:
            grid.append((row_indicator, row[::-1]))
        else:
            grid.append((row_indicator, row))

        row_indicator += 1

    reversed_grid = list(reversed(grid))
    return reversed_grid


def colored_grid(grid, color_mapping):
    """Prints a colored grid.

    Args:
        grid (list): The grid to be colored
        color_mapping (dict): A key mapped to an ANSI color code
    """
    for row_indicator, row in grid:
        colored_row = []

        for stitch in row:
            initial = stitch[0]  # Extract the initial letter and convert to lowercase
            color_code = color_mapping.get(initial, '')  # Get the color code from the mapping
            colored_stitch = f'{color_code}{stitch}\033[0m'  # Reset color after each stitch
            colored_row.append(colored_stitch)

        if row_indicator % 2 != 0 and row_indicator < 10:
            print(f'{row_indicator}  {" ".join(colored_row)}')
        elif row_indicator % 2 == 0 and row_indicator < 10:
            print(f'{row_indicator}   {" ".join(colored_row)}')
        elif row_indicator % 2 != 0 and row_indicator >= 10:
            print(f'{row_indicator} {" ".join(colored_row)}')
        else:
            print(f'{row_indicator}  {" ".join(colored_row)}')


if __name__ == "__main__":
    red_heart_shaded_dusk = ['1', '2', '3', '4', '5',
                             '6', '7', '8', '9', '10',
                             '11', '12', '13', '14', '15',
                             '16', '17', '18']

    blue_barn_dead_mans_hand = ['w', 'a', 'a', 'a', 'd',
                                'd', 'd', 'd', 'a', 'a',
                                'a', 'w', 'w', 'a', 'a',
                                'a', 'd', 'd', 'd', 'a',
                                'a', 'a', 'a']

    impeccable_leaves = ['c', 'c', 'c', 'y', 'y',
                         'y', 'y', 'a', 'a', 'a',
                         'a', 'a', 'a', 'a', 'r',
                         'r', 'r']

    num_mode_list = [1, 2, 3, 4, 5, 6, 7]

    grid = grid_generator(red_heart_shaded_dusk, 100, 20)

    # Delete the triple quotes at the beginning and end to print a formatted grid
    """for row_indicator, row in grid:
        if row_indicator % 2 != 0 and row_indicator < 10:
            print(f'{row_indicator}  {row}')
        elif row_indicator % 2 == 0 and row_indicator < 10:
            print(f'{row_indicator}    {row}')
        elif row_indicator % 2 != 0 and row_indicator >= 10:
            print(f'{row_indicator} {row}')
        else:
            print(f'{row_indicator}   {row}')"""

    # This color mapping could work if you switch the characters for numbers,
    # It'd just take more time to write multiple entries for many numbers
    color_mapping = {
        'w': '\033[97m',        # White
        'r': '\033[91m',        # Red
        'g': '\033[92m',        # Green
        'b': '\033[94m',        # Blue
        'm': '\033[95m',        # Magenta
        'y': '\033[93m',        # Yellow
        'o': '\033[38;5;202m',  # Orange
        'z': '\033[37m',        # Light Gray
        's': '\033[96m',        # Sky Blue
        'd': '\033[90m',        # Dark Gray
        'a': '\033[38;5;136m',  # Gold
        'c': '\033[33m'         # Brown
        # Add more color mappings as needed
    }

    # Comment out if you don't want colored grid
    colored_grid(grid, color_mapping)
