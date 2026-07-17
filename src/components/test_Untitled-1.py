import unittest
from Untitled-1 import valid_permutations

class TestValidPermutations(unittest.TestCase):

    def test_input_1(self):
        self.assertEqual(valid_permutations(1), 1)

    def test_input_2(self):
        self.assertEqual(valid_permutations(2), 2)

    def test_input_3(self):
        self.assertEqual(valid_permutations(3), 3)

    def test_input_4(self):
        self.assertEqual(valid_permutations(4), 8)

    def test_input_5(self):
        self.assertEqual(valid_permutations(5), 10)

if __name__ == '__main__':
    unittest.main()
