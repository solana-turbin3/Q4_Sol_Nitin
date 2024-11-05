use anchor_lang::prelude::*;

mod state;
mod instructions;
mod errors;

use instructions::*;

declare_id!("DvxKWaWk2gYM5jrtM171ddk5Fu38XeDJ4F1jhdCb5xtp");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize_user(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_user_account(&ctx.bumps)
    }

    pub fn intialize_config(ctx: Context<InitializeConfig>, points_per_stake: u8, max_stake:u8, freeze_period: u32) -> Result<()> {
        ctx.accounts.initialize_config(points_per_stake, max_stake, freeze_period, &ctx.bumps)
    }

    pub fn stake(ctx: Context<Stake>) -> Result<()> {
        ctx.accounts.stake(&ctx.bumps)
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        ctx.accounts.unstake()
    }

    pub fn claim_rewards(ctx: Context<Claim>) -> Result<()> {
        ctx.accounts.claim()
    }
}
