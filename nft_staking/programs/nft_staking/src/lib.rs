use anchor_lang::prelude::*;

mod state;
mod instructions;

use instructions::*;

declare_id!("DvxKWaWk2gYM5jrtM171ddk5Fu38XeDJ4F1jhdCb5xtp");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
