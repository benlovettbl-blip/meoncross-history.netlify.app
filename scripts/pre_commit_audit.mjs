import { auditUnit } from './audit_curriculum_data.mjs';

const KS3_UNITS = [
    'change_1450_1750',
    'early_modern_world',
    'great_war',
    'great_war_part2',
    'industrialisation_and_empire',
    'water_and_sanitation',
    'the_shoah',
    'australia',
    'cold_war'
];

async function runAudit() {
    console.log("Starting Pre-Commit Curriculum Audit...");
    let allPassed = true;
    for (const unit of KS3_UNITS) {
        const passed = await auditUnit(unit);
        if (!passed) {
            allPassed = false;
        }
    }

    if (!allPassed) {
        console.error("\n❌ PRE-COMMIT AUDIT FAILED. Please fix the warnings above before committing.");
        process.exit(1);
    } else {
        console.log("\n✅ Pre-commit audit passed successfully.");
        process.exit(0);
    }
}

runAudit();
