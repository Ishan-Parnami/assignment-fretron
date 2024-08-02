def turn_left(direction):
    return (direction + 1) % 4

def move_in_direction(position, direction):
    x, y = position
    if direction == 0:
        return (x, y + 1)
    elif direction == 1:
        return (x + 1, y)
    elif direction == 2:
        return (x, y - 1)
    elif direction == 3:
        return (x - 1, y)

def is_valid_move(position, board_size, soldiers):
    x, y = position
    return 0 <= x < board_size and 0 <= y < board_size and position not in soldiers

def find_paths(start, soldiers, board_size):
    paths = []
    stack = [(start, [], 0, set(soldiers))]

    while stack:
        position, path, direction, remaining_soldiers = stack.pop()
        if not remaining_soldiers and position == start:
            paths.append(path + ["Arrive {}".format(start)])
            continue

        next_position = move_in_direction(position, direction)
        if next_position in remaining_soldiers:
            new_remaining_soldiers = remaining_soldiers - {next_position}
            new_path = path + ["Kill {}. Turn Left".format(next_position)]
            stack.append((next_position, new_path, turn_left(direction), new_remaining_soldiers))
        elif is_valid_move(next_position, board_size, soldiers):
            stack.append((next_position, path + ["Jump {}".format(next_position)], direction, remaining_soldiers))

    return paths

def main():
    board_size = 10
    num_soldiers = int(input("Enter the number of soldiers: "))
    soldiers = set()
    
    for i in range(num_soldiers):
        x, y = map(int, input(f"Enter coordinates for soldier {i+1}: ").split(','))
        soldiers.add((x-1, y-1))

    x, y = map(int, input("Enter the coordinates for your 'special' castle: ").split(','))
    start = (x-1, y-1)

    paths = find_paths(start, soldiers, board_size)

    print("\nThanks. There are {} unique paths for your 'special_castle'\n".format(len(paths)))

    for i, path in enumerate(paths):
        print("Path {}: \n=======\nStart {}".format(i + 1, start))
        for step in path:
            print(step)
        print()

if __name__ == "__main__":
    main()
