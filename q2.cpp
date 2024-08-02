#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

struct Apple {
    int weight;
    int index;
};

bool compareApples(const Apple& a, const Apple& b) {
    return a.weight > b.weight;
}

int main() {
    std::vector<Apple> apples;
    int weight;

    std::cout << "Enter apple weight in gram (-1 to stop): ";
    while (std::cin >> weight && weight != -1) {
        apples.push_back({weight, 0});
        std::cout << "Enter apple weight in gram (-1 to stop): ";
    }

    int totalWeight = 0;
    for (const auto& apple : apples) {
        totalWeight += apple.weight;
    }

    double ramTarget = 0.5 * totalWeight;
    double shamTarget = 0.3 * totalWeight;
    double rahimTarget = 0.2 * totalWeight;

    double ramShare = 0, shamShare = 0, rahimShare = 0;
    std::vector<std::vector<int>> distribution(3);

    std::sort(apples.begin(), apples.end(), compareApples);

    for (const auto& apple : apples) {
        if (std::abs(ramShare + apple.weight - ramTarget) <= std::abs(ramShare - ramTarget)) {
            distribution[0].push_back(apple.weight);
            ramShare += apple.weight;
        } else if (std::abs(shamShare + apple.weight - shamTarget) <= std::abs(shamShare - shamTarget)) {
            distribution[1].push_back(apple.weight);
            shamShare += apple.weight;
        } else {
            distribution[2].push_back(apple.weight);
            rahimShare += apple.weight;
        }
    }

    std::cout << "\nDistribution Result:\n";
    std::cout << "Ram: ";
    for (const auto& w : distribution[0]) std::cout << w << " ";
    std::cout << "\nSham: ";
    for (const auto& w : distribution[1]) std::cout << w << " ";
    std::cout << "\nRahim: ";
    for (const auto& w : distribution[2]) std::cout << w << " ";
    std::cout << "\n";

    return 0;
}
