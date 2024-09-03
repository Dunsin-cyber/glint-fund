// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./Ownable.sol";

contract MnlaStake is Ownable {
    IERC20 public stakingToken;
    IERC20 public rewardsToken;

    uint256 public constant REWARD_PERCENTAGE = 328; // 0.328% per day
    address rewardBank;

    struct Stake {
        uint256 id;
        uint256 amount;
        uint256 duration;
        uint256 startTime;
        uint256 rewardRate;
    }

    mapping(address => Stake[]) public userStakes;

    event Staked(address indexed user, uint256 amount, uint256 duration, uint256 startTime);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        // rewardBank = _rewardBank;
    }

    function stake(uint256 _amount, uint256 _duration) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(_duration == 180 || _duration == 360 || _duration == 720, "Invalid staking duration");

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        // require(success, "Token transfer failed");

        uint256 rewardRate = calculateRewardRate(_duration, _amount);
        uint256 stakeId = userStakes[msg.sender].length;

        userStakes[msg.sender].push(Stake({
            id: stakeId,
            amount: _amount,
            duration: _duration,
            startTime: block.timestamp,
            rewardRate: rewardRate
        }));

        // emit Staked(msg.sender, _amount, _duration, block.timestamp);
    }

    function stake2(uint256 _amount, uint256 _duration) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(_duration == 180 || _duration == 360 || _duration == 720, "Invalid staking duration");

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        // require(success, "Token transfer failed");

        uint256 rewardRate = calculateRewardRate(_duration, _amount);
        uint256 stakeId = userStakes[msg.sender].length;

        userStakes[msg.sender].push(Stake({
            id: stakeId,
            amount: _amount,
            duration: _duration,
            startTime: block.timestamp,
            rewardRate: rewardRate
        }));

        emit Staked(msg.sender, _amount, _duration, block.timestamp);
    }

    function withdraw(uint256 _stakeIndex) public {
        require(_stakeIndex < userStakes[msg.sender].length, "Invalid stake index");

        Stake storage userStake = userStakes[msg.sender][_stakeIndex];
        require(userStake.amount > 0, "Nothing to withdraw");
        require(block.timestamp >= userStake.startTime + userStake.duration, "Stake period not yet completed");

        uint256 amount = userStake.amount;
        uint256 reward = calculateStakeReward(userStake);
        userStake.amount = 0;

        stakingToken.transfer(msg.sender, amount);
        
        if (reward > 0) {
            bool rewardSuccess = rewardsToken.transfer(msg.sender, reward);
            require(rewardSuccess, "Reward transfer failed");
        }

    }

    function withdraw2(uint256 _stakeIndex) public {
        require(_stakeIndex < userStakes[msg.sender].length, "Invalid stake index");

        Stake storage userStake = userStakes[msg.sender][_stakeIndex];
        require(userStake.amount > 0, "Nothing to withdraw");
        require(block.timestamp >= userStake.startTime + userStake.duration, "Stake period not yet completed");

        uint256 amount = userStake.amount;
        uint256 reward = calculateStakeReward(userStake);
        userStake.amount = 0;

        bool success = stakingToken.transfer(msg.sender, amount);
        require(success, "Token transfer failed");
        
        if (reward > 0) {
            bool rewardSuccess = rewardsToken.transferFrom(address(this), msg.sender, reward);
            require(rewardSuccess, "Reward transfer failed");
        }

        emit Withdrawn(msg.sender, amount);
        emit RewardPaid(msg.sender, reward);
    }


    function calculateRewardRate(uint256 _duration, uint256 _amount) public pure returns (uint256) {
        if (_duration == 180) {
            return (_amount * 1751) / 1e8;
        } else if (_duration == 360) {
            return (_amount * 18894) / 1e9;
        } else if (_duration == 720) {
            return (_amount * 24199) / 1e9;
        } else {
            revert("Invalid staking duration");
        }
    }

    function calculateStakeReward(Stake memory userStake) internal pure returns (uint256) {
        uint256 amount = userStake.amount;
        uint256 duration = userStake.duration;

        uint256 totalReward;

        if (duration == 180) {
            totalReward = (amount * 1576) / 1e4;
        } else if (duration == 360) {
            totalReward = (amount * 3400096) / 1e7;
        } else if (duration == 720) {
            totalReward = (amount * 883265) / 1e6;
        } else {
            revert("Invalid staking duration");
        }

        return totalReward;
    }

    function getUserStakingInfos(address _user) external view returns (uint256[] memory amounts, uint256[] memory durations, uint256[] memory startTimes) {
        uint256 length = userStakes[_user].length;
        amounts = new uint256[](length);
        durations = new uint256[](length);
        startTimes = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            Stake memory stakeInfo = userStakes[_user][i];
            amounts[i] = stakeInfo.amount;
            durations[i] = stakeInfo.duration;
            startTimes[i] = stakeInfo.startTime;
        }

        return (amounts, durations, startTimes);
    }
}
